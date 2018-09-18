import FineUploaderTraditional from 'fine-uploader-wrappers';

export const uploader = new FineUploaderTraditional ({
	options: {
		autoUpload: false,
		chunking: {
			enabled: true
		},
		deleteFile: {
			enabled: false,
		},
		retry: {
			enableAuto: false
		}
	}
});