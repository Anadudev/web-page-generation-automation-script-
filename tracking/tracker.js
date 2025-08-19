const { writeFile } = require( "../utils/fileCRUD" );
const trackRecord = require( "./trackRecord.json" );

module.exports.tracker = async( newIndex ) => {
	const newRecord = [ { index: ( trackRecord[ 0 ].index = newIndex ) } ];

	await writeFile( `./tracking/trackRecord.json`, JSON.stringify( newRecord, null, 2 ) );
};

module.exports.getTrack = () => {
	return trackRecord[ 0 ].index;
};
