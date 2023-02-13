export const iconDataTypes = new Map(
    [
        ['Imaging',
            {
                iconDataType: 'Imaging',
                iconImage: 'icon_imaging_132x132.png'
            }
        ],
        ['Metabolomics',
            {
                iconDataType: 'Metabolomics',
                iconImage: 'icon_metabolomics_132x132.png'
            }
        ],
        ['Other',
            {
                iconDataType: 'Other',
                iconImage: 'icon_other_132x132.png'
            }
        ],
        ['Proteomics',
            {
                iconDataType: 'Proteomics',
                iconImage: 'icon_proteomics_132x132.png'
            }
        ],
        ['Transcriptomics',
            {
                iconDataType: 'Transcriptomics',
                iconImage: 'icon_transcriptomics_132x132.png'
            }
        ],
        ['Epigenetics',
            {
                iconDataType: 'Epigenetics',
                iconImage: 'icon_epigenetics.png'
            }
        ],
        ['Pilot 3',
        	{
        		iconDataType: 'Pilot3',
        		iconImage: 'icon_pilot3_132x132.png',
        		dataTypes: ['Pilot 3 Receipt Picture']
        	}
        ],
        ['Biomarker',
            {
                iconDataType: 'Biomarker',
                iconImage: 'icon_biomarker_132x132.png'
            }

        ]
    ]
);


export const getDataTypeIconInfo = (packageTypeIcons, dataType) => {
    let packageTypeIcon = packageTypeIcons.find( iconInfo => {
        let packageTypeArr = iconInfo.packageTypes.map( packageType => {return packageType.toLowerCase()});
        return (packageTypeArr.includes(dataType.toLowerCase()));
    }, this);

    if (packageTypeIcon && iconDataTypes.has(packageTypeIcon.iconType)) {
        return iconDataTypes.get(packageTypeIcon.iconType)
    } else {
        return iconDataTypes.get('Other')
    }
};



