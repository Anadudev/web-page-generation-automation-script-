const slugFilters = require( "../database/slugFilters" );
const extractQuestion = require( "./extractQuestion" );

const generatePageSlug = ( title, maxLength = 60 ) => {
	if ( !title || typeof title !== "string" )
	{
		console.error( "Input must be a non-empty string." );
		return "";
	}

	// Handle question marks by cutting the string at the first instance
	title = extractQuestion( title );

	// 1. Convert the title to lowercase and split into words
	let slugWords = title.toLowerCase().split( /\s+/ );

	// 2. Filter out stop words
	slugWords = slugWords.filter( word => !slugFilters.includes( word ) );

	// 3. Join the words with hyphens
	let slug = slugWords.join( "-" );

	// 4. Remove any remaining characters that are not a-z, 0-9, or hyphens
	slug = slug.replace( /[^a-z0-9-]/g, "" );

	// 5. Replace multiple consecutive hyphens with a single hyphen
	slug = slug.replace( /-{2,}/g, "-" );

	// 6. Trim any leading or trailing hyphens
	slug = slug.replace( /^-+|-+$/g, "" );

	// 7. Truncate the slug if it exceeds the maximum length
	if ( slug.length > maxLength )
	{
		let truncatedSlug = "";
		const words = slug.split( "-" );
		for ( let i = 0; i < words.length; i++ )
		{
			if ( ( truncatedSlug + "-" + words[ i ] ).length <= maxLength )
			{
				if ( truncatedSlug !== "" )
				{
					truncatedSlug += "-";
				}
				truncatedSlug += words[ i ];
			} else
			{
				break;
			}
		}
		slug = truncatedSlug;
	}

	return slug;
};

module.exports = generatePageSlug;
