const { writeFile } = require( "../utils/fileCRUD" );
const trackRecord = require( "./trackRecord.json" );


exports.getTrack = () => {
	return trackRecord[ 0 ].index;
};

exports.tracker = async ( newIndex ) => {
	const newRecord = [ { index: ( trackRecord[ 0 ].index = newIndex ) } ];
	await writeFile( `./tracking/trackRecord.json`, JSON.stringify( newRecord, null, 2 ) );
};

exports.categoryTracker = async ( newCategoryIndex ) => {
	const newRecord = [ {
		index: trackRecord[ 0 ].index,
		categoryIndex: trackRecord[ 0 ].categoryIndex = newCategoryIndex
	} ];
	await writeFile( `./tracking/trackRecord.json`, JSON.stringify( newRecord, null, 2 ) );
};

exports.categoryTrack = () => {
	return trackRecord[ 0 ].categoryIndex;
};
