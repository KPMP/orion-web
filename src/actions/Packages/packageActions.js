import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import qq from 'fine-uploader/lib/core';
import { sendMessageToBackend } from '../Error/errorActions';
import { getDTDByVersion } from '../dtdActions';

const api = Api.getInstance();

export const getPackages = () => {
	return (dispatch) => {
		api.get('/api/v1/packages')
			.then(res => {
				dispatch(setPackages(res.data));
				let versions = [];
				res.data.forEach(function(packageItem) {
					if (!versions.includes(packageItem.packageInfo.version)) {
						versions.push(packageItem.packageInfo.version);
					}
				});
				versions.forEach(function(version) {
					dispatch(getDTDByVersion(version));
				});
			})
			.catch(err => {
				dispatch(sendMessageToBackend(err));
			});
	};
};

export const getPackageEvents = (callback) => {
	return (dispatch) => {
		api.get('/api/v1/state/events/' + new Date().getTime())
			.then((data) => {
				// timeout: true will be sent by server if the server times out before the client
				if(!data.data.hasOwnProperty('timeout')) {
                    dispatch(getPackages());
                }

				callback.networkRetries = 0;
				callback();
			})
			.catch(err => {
				if(err.code === 502 ||
					err.message.match(RegExp('502')) ||
					err.message.match(RegExp('timeout', 'gi'))) {
					// Timeouts are typical and not limited
					callback();
				}

				else if(err.message.match(RegExp('Network Error', 'gi')) &&
					(callback.networkRetries === undefined || callback.networkRetries < 3)) {
					// Network retries are limited
					callback.networkRetries = callback.networkRetries || 0;
                    callback.networkRetries++;
					callback();
				}

				else if(err.message.match(RegExp('aborted', 'gi'))) {
					// Client terminated polling; do nothing
				}

				else {
					dispatch(sendMessageToBackend(err));
				}
			});
	};
};

export const setPackages = (packages) => {
	return {
		type: actionNames.SET_PACKAGES,
		payload: packages
	}
}

export const setIsUploading = (isUploading) => {
	return {
		type: actionNames.SET_IS_UPLOADING,
		payload: isUploading
	}
}

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

