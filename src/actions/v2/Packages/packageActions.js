import actionNames from '../../actionNames';
import Api from '../../../helpers/Api';
const api = Api.getInstance();

export const getPackages = () => {
	return (dispatch) => {
		api.get('/api/v1/packages')
			.then(res => {
				dispatch(setPackages(res.data));
			})
			.catch(err => {
                alert("Cannot connect to KPMP Data Lake File Repository");
                console.error(err);
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
		api.post('/api/v1/packages/' + packageId + '/files/finish')
			.then(res => {
				dispatch(setIsUploading(false));
				window.location.reload();
			})
			.catch(err => {
				alert("We were unable to finish your package upload.  You will be unable to download");
				dispatch(setIsUploading(false));
				console.log(err);
			});
	}
}

export const uploadPackage = (packageInfo, uploader) => {
	if (packageInfo.packageType === "Other") {
		packageInfo.packageType = packageInfo.packageTypeOther;
	}
	return (dispatch) => {
		dispatch(setIsUploading(true));
		api.post('/api/v1/packages', packageInfo)
		.then(res=> {
			let packageId = res.data;
			let totalFiles = uploader.methods.getUploads().length;
			uploader.on('allComplete', function(successes, failures) {
				if (successes.length === totalFiles) {
					dispatch(finishPackage(packageId));
				}
			});
			uploader.methods.setEndpoint('/api/v1/packages/' + packageId + '/files');
			uploader.methods.uploadStoredFiles();
		})
		.catch(err => {
			alert("We were unable to upload your package to the KPMP Data Lake File Repository");
			console.log(err);
		});
	};
}

