import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useCustomQuery } from '../../hooks';
import { getKeyValueFromQueryString } from '../../utils';

const ItemDetails = () => {

	const { id } = useParams();

	// TODO: Make fetcher for the item
	// TODO: Metadata

	const renderHelmet = () => {
		let retHead = <></>;
		return retHead;
	};

	return (
		<>
			{renderHelmet()}
			<div>
				THE ITEM CONTENTS WOULD GO HERE. OR 404.
			</div>
		</>
	);
};

export default ItemDetails;
