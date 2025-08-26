# Changelog

## Release 1.3
Brief summary of what's in this release:

* Warnings if duplicate study, biopsy, and data type entry is made
* Notifications routed based on study name
* Close button not working on file attachment edit page
* Locked uploads still have the "Open Folder" link

### Breaking changes

* The notification email addresses must be in a comma-separated list in the ENV_SMTP_RECIPIENT .env var

## Release 1.2

- Duplicate file prevention
- Bad Fine Uploader state prevention
- Wording on attachments link
- Wording fix on failed uploads

## Release 1.1
* BiopsyID filter
* StudyID and Last Modified added to upload information on front page
* Upload locking (admins only)
* File type restriction on file upload dialog (JPG/JPEG only) 
* Curator Data Lake file view button (admins only)
* File deletion (admins and upload owners)
* File adding / replacing (admins and upload owners)
* Duplicate file name restriction 
* Table file view with original and HALOLink file names
* Study-dependent StudyID hint text 
* New MiKTMC email account for notifications
* Additional information and links to Data Lake added to notification emails

## Release 1.0.1
Brief summary of what's in this release:

- Added icons to the attchment modal for admins/users to edit uploaded packages

### Breaking changes

- Need to update the dynamicForms to version 10 from qa to handle site field correctly

### Non-breaking changes

Added "constrains" property to fields that are used in a "constrainedBy" so that we can reset the constrained field when it changes. This ensures that we don't have an improper value in the constrained field.


## Release 1.0
Initial release
