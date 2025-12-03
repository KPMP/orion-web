import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import qq from 'fine-uploader/lib/core';
import { sendMessageToBackend } from '../Error/errorActions';
import { getDTDByVersion } from '../dtdActions';

const api = Api.getInstance();

export const getPackagesStateless = () => {
		return api.get('/api/v1/packages?shouldExclude=false')
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.log(err)
			});
};

export const setDtds = (packages) => {
	return (dispatch) => {
		let versions = [];
		packages.forEach(function(packageItem) {
		if (!versions.includes(packageItem.packageInfo.version)) {
			versions.push(packageItem.packageInfo.version);
		}
		});
		versions.forEach(function(version) {
			dispatch(getDTDByVersion(version));
		});
	};
};

export const setIsUploading = (isUploading) => {
	return {
		type: actionNames.SET_IS_UPLOADING,
		payload: isUploading
	}
};

export const setDuplicatePackage = (duplicatePackage) => {
    return {
        type: actionNames.SET_DUPLICATE_PACKAGE,
        payload: duplicatePackage
    }
}

export const setRefreshPackages = (refreshPackages) => {
	return {
		type: actionNames.SET_REFRESH_PACKAGES,
		payload: refreshPackages
	}
};

export const duplicatePackage = (state = false, action) => {
    let newState = {...state};
    switch(action.type) {
        case actionNames.SET_DUPLICATE_PACKAGE:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export const finishPackage = (packageId, reload = true) => {
	return (dispatch) => {
		api.post('/api/v1/packages/' + packageId + '/files/finish', window.location.hostname)
			.then(res => {
				dispatch(setIsUploading(false));
				if (reload) {
					window.location = '/';
				}
			})
			.catch(err => {
				alert("We were unable to finish your package upload.  You will be unable to download");
				dispatch(setIsUploading(false));
				console.log(err);
			});
	}
}

export const clearCache = () => {
    return api.get("/api/v1/clearCache")
    .then(response => {
        return response?.status;
    })
    .catch(err => {
        console.log(err);
        return err?.response?.status;
    })
}

export const lockPackage = (packageId) => {
	return api.post('/api/v1/packages/' + packageId + '/lock', window.location.hostname)
		.then(response => {
			return response?.status;
		})
		.catch(err => {
			alert("There was a problem locking the package.");
			console.log(err);
			return err?.response?.status;
		})
}

export const editPackage = (packageId, packageEdits) => {
	return api.post('/api/v1/packages/' + packageId + '/edit', packageEdits)
        .then(response => {
            return response?.status;
        })
        .catch(err => {
            alert("There was a problem editing the file.");
            console.log(err);
            return err?.response?.status;
        });
}

export const deleteFile = (packageId, fileId) => {
    return api.post("/api/v1/packages/" + packageId + "/files/delete/" + fileId)
        .then(response => {
            return response?.status;
        })
        .catch(err => {
            alert("There was a problem deleting the file.");
            console.log(err);
            return err?.response?.status;
        })
}

export const setShowLargeFileModal = (globusURL) => {
	return {
		type: actionNames.SET_SHOW_LARGE_FILE_MODAL,
		payload: globusURL
	}
}

export const clearShowLargeFileModal = () => {
	return {
		type: actionNames.CLEAR_SHOW_LARGE_FILE_MODAL,
	}
}

export const processLargeFile = (globusURL) => {
	return (dispatch) => {
		dispatch(setShowLargeFileModal(globusURL));
	}
}

export const uploadPackage = (packageInfo, uploader) => {
	if (packageInfo.packageType === "Other") {
		packageInfo.packageType = packageInfo.packageTypeOther;
	}
	packageInfo.submitter = {
		...packageInfo.submitter,
		firstName: packageInfo.submitterFirstName,
		lastName: packageInfo.submitterLastName,
		email: packageInfo.submitterEmail
	};
	
	let activeFiles = uploader.methods.getUploads({
		status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});
	packageInfo.files = activeFiles.map((file) => {
		return {
			fileName: file.name,
			size: file.size
		}
	});
	return (dispatch) => {
		dispatch(setIsUploading(true));
        dispatch(setDuplicatePackage(false));
		api.post('/api/v1/packages', packageInfo, { params: { hostname: window.location.hostname} })
		.then(res=> {
            if (res.data.errorMessage) {
                packageInfo.duplcatePackage = true;
                dispatch(setDuplicatePackage(true));
                alert(res.data.errorMessage);
                dispatch(setIsUploading(false));
            }
            else{
                let packageId = res.data.packageId;
			    let canceledFiles = uploader.methods.getUploads(
			    	{status: [qq.status.CANCELED]});
			    let rejectedFiles = uploader.methods.getUploads(
			    	{status: [qq.status.REJECTED]});
			    let allFiles = uploader.methods.getUploads();
			    let totalFiles = allFiles.length - (canceledFiles.length + rejectedFiles.length);
				uploader.on('allComplete', function (succeeded, failed) {
					if (succeeded.length === totalFiles) {
						dispatch(finishPackage(packageId));
					} 
                    else if (failed.length > 0) {
						alert("We were unable to upload all of your files. You will need to resubmit this package.");
						dispatch(setIsUploading(false));
						dispatch(sendMessageToBackend("Unable to upload all files in package.", "Total files: " + totalFiles + " succeeded: " + succeeded.length));
					}
                    
				});
				uploader.methods.setEndpoint(api.fixArguments(['/api/v1/packages/' + packageId + '/files']));
				uploader.methods.uploadStoredFiles();
            }
			

		})
		.catch(err => {
			console.log(err)
			dispatch(sendMessageToBackend(err));
			dispatch(setIsUploading(false));
		});
	};
}

export const replaceFile = (packageId, fileId, uploader) => {
	let packageInfo = { packageId: packageId };
	let activeFiles = uploader.methods.getUploads({
		status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});
	packageInfo.files = activeFiles.map((file) => {
		return {
			fileName: file.name,
			size: file.size
		}
	});
	let canceledFiles = uploader.methods.getUploads(
		{status: [qq.status.CANCELED]});
	let allFiles = uploader.methods.getUploads();
	let totalFiles = allFiles.length - canceledFiles.length;
	return (dispatch) => {
		dispatch(setIsUploading(true));
		api.post('/api/v1/packages/' + packageId + '/files/replace/'+ fileId, packageInfo, {params: {hostname: window.location.hostname}})
			.then(res => {
				if (res.data.success) {
					uploader.on('allComplete', function (succeeded, failed) {
						if (succeeded.length === totalFiles) {
							dispatch(finishPackage(packageId, false));
						} else if (succeeded.length > 0 && failed.length > 0) {
							dispatch(finishPackage(packageId, false));
							dispatch(alert("We were unable to upload all of your files. Check for duplicate files."));
							dispatch(sendMessageToBackend("Unable to upload all files in package.", "Total files: " + totalFiles + " succeeded: " + succeeded.length));
						} else if (failed.length === totalFiles) {
							dispatch(alert("We were unable to upload any of your files. Check for duplicate files or contact support if problem persists."));
							dispatch(sendMessageToBackend("Unable to upload all files in package.", "Total files: " + totalFiles + " succeeded: " + succeeded.length));
						}
					});
					uploader.methods.setEndpoint(api.fixArguments(['/api/v1/packages/' + packageId + '/files']));
					uploader.methods.uploadStoredFiles();
				} else {
					if (uploader.methods.getUploads().length > 0) {
						uploader.methods.cancelAll();
						uploader.methods.setStatus(0, qq.status.DELETED);
						uploader.methods.reset();
						uploader.methods.clearStoredFiles();
						alert("We were unable to upload your file. Is it a duplicate?");
					}
					alert("Please add a file.");
				}

			})
			.catch(err => {
				console.log(err)
				dispatch(sendMessageToBackend(err));
				dispatch(setIsUploading(false));
			});
	}
}

export const uploadFiles = (packageId, uploader) => {
	let packageInfo = { packageId: packageId };
	let activeFiles = uploader.methods.getUploads({
		status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});
	packageInfo.files = activeFiles.map((file) => {
		return {
			fileName: file.name,
			size: file.size
		}
	});
	let canceledFiles = uploader.methods.getUploads(
		{status: [qq.status.CANCELED]});
	let allFiles = uploader.methods.getUploads();
	let totalFiles = allFiles.length - canceledFiles.length;
	 return (dispatch) => {
		 dispatch(setIsUploading(true));
		 api.post('/api/v1/packages/' + packageId + '/files/add', packageInfo, {params: {hostname: window.location.hostname}})
			 .then(res => {
				 let returnedFiles = res.data;
				 uploader.on('allComplete', function (succeeded, failed) {
					 if (succeeded.length === totalFiles) {
						 dispatch(finishPackage(packageId, false));
					 } else if (succeeded.length > 0 && failed.length > 0) {
						 dispatch(finishPackage(packageId, false));
						 dispatch(alert("We were unable to upload all of your files. Check for duplicate files."));
						 dispatch(sendMessageToBackend("Unable to upload all files in package.", "Total files: " + totalFiles + " succeeded: " + succeeded.length));
					 } else if (failed.length === totalFiles) {
						 dispatch(alert("We were unable to upload any of your files. Check for duplicate files or contact support if problem persists."));
						 dispatch(sendMessageToBackend("Unable to upload all files in package.", "Total files: " + totalFiles + " succeeded: " + succeeded.length));
					 }
				 });
				 uploader.methods.setEndpoint(api.fixArguments(['/api/v1/packages/' + packageId + '/files']));
				 uploader.methods.uploadStoredFiles();
			 })
			 .catch(err => {
				 console.log(err)
				 dispatch(sendMessageToBackend(err));
				 dispatch(setIsUploading(false));
			 });
	 }
}


