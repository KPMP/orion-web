const iconDataTypes = new Map(
    [
        ['Imaging',
            {
                iconDataType: 'Imaging',
                iconImage: 'icon_imaging_132x132.png',
                dataTypes: ['3-D tissue imaging', 'CODEX', 'Multiplex ISH', 'Whole Slide Images']
            }
        ],
        ['Metabolomics',
            {
                iconDataType: 'Metabolomics',
                iconImage: 'icon_metabolomics_132x132.png',
                dataTypes: ['Spatial Metabolomics']
            }
        ],
        ['Other',
            {
                iconDataType: 'Other',
                iconImage: 'icon_other_132x132.png',
                dataTypes: ['DNA Methylation', 'Other']
            }
        ],
        ['Proteomics',
            {
                iconDataType: 'Proteomics',
                iconImage: 'icon_proteomics_132x132.png',
                dataTypes: ['Near-single-cell Proteomics', 'Sub-segmental Proteomics']
            }
        ],
        ['Transcriptomics',
            {
                iconDataType: 'Transcriptomics',
                iconImage: 'icon_transcriptomics_132x132.png',
                dataTypes: ['Bulk RNAseq', 'Segmental miRNA', 'Single-cell RNAseq', 'Single-nucleus RNAseq', 'Sub-segment RNAseq']
            }
        ]
    ]
);


export const getDataTypeIconInfo = (dataType) => {
    for(let [iconDataTypeKey, iconDataTypeInfo] of iconDataTypes) {
        iconDataTypeInfo.iconDataTypeKey = iconDataTypeKey;
        if (iconDataTypeInfo.dataTypes.indexOf(dataType) !== -1) {
            return iconDataTypeInfo
        }
    }
    return iconDataTypes.get('Other')
};



