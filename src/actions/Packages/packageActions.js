import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import qq from 'fine-uploader/lib/core';
import { sendMessageToBackend } from '../Error/errorActions';
import { getDTDByVersion } from '../dtdActions';

const api = Api.getInstance();

export const getPackagesStateless = () => {
		return api.get('/api/v1/packages?shouldExclude=true')
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

export const setRefreshPackages = (refreshPackages) => {
	return {
		type: actionNames.SET_REFRESH_PACKAGES,
		payload: refreshPackages
	}
};

export const finishPackage = (packageId) => {
	return (dispatch) => {
		api.post('/api/v1/packages/' + packageId + '/files/finish', window.location.hostname)
			.then(res => {
				dispatch(setIsUploading(false));
				window.location = '/';
			})
			.catch(err => {
				alert("We were unable to finish your package upload.  You will be unable to download");
				dispatch(setIsUploading(false));
				console.log(err);
			});
	}
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
		api.post('/api/v1/packages', packageInfo, { params: { hostname: window.location.hostname} })
		.then(res=> {
			let packageId = res.data.packageId;
			let globusURL = res.data.globusURL;
			let canceledFiles = uploader.methods.getUploads(
				{status: [qq.status.CANCELED]});
			let allFiles = uploader.methods.getUploads();
			let totalFiles = allFiles.length - canceledFiles.length;
			if (packageInfo.largeFilesChecked) {
				dispatch(setIsUploading(false));
				dispatch(processLargeFile(globusURL));
			} else {
				uploader.on('allComplete', function (succeeded, failed) {
					if (succeeded.length === totalFiles) {
						dispatch(finishPackage(packageId));
					} else if (failed.length > 0) {
						alert("We were unable to upload all of your files. You will need to resubmit this package.");
						dispatch(setIsUploading(false));
						dispatch(sendMessageToBackend("Unable to upload all files in package.", "Total files: " + totalFiles + " succeeded: " + succeeded.length));
					}
				});
			}
			uploader.methods.setEndpoint(api.fixArguments(['/api/v1/packages/' + packageId + '/files']));
			uploader.methods.uploadStoredFiles();
		})
		.catch(err => {
			console.log(err)
			dispatch(sendMessageToBackend(err));
			dispatch(setIsUploading(false));
		});
	};
}

export const recallPackage = (packageId) => {
	return api.post('/api/v1/packages/' + packageId + '/recall', packageId, { params: { hostname: window.location.hostname} }, { timeout: 10 * 60 * 1000 })
		.then(response => {
			return response?.status;
		})
		.catch(err => {
			alert("There was a problem recalling the package.");
			console.log(err);
			return err?.response?.status;
		})
}
