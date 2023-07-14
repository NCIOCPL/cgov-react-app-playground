import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTracking } from 'react-tracking';

import { useStateValue } from '../../store/store';
import { i18n } from '../../utils';

const PageNotFound = () => {
	const [{ canonicalHost, language }] = useStateValue();
	// Why is searchText not being used anywhere in this file if we
	// are using state???
	const [, updateSearchText] = useState('');
	const tracking = useTracking();

	useEffect(() => {
		const pageTitle = i18n.pageNotFoundTitle[language];
		tracking.trackEvent({
			event: 'SitewideSearchApp:Load:PageNotFound',
			metaTitle: pageTitle,
			name: `${canonicalHost.replace('https://', '')}${
				window.location.pathname
			}`,
			title: pageTitle,
			type: 'PageLoad',
		});
	}, []);

	const contentPar =
		language === 'es'
			? [
					<>No podemos encontrar la página que busca.</>,
					<>
						Visite la{' '}
						<a href="https://www.cancer.gov/espanol">página principal</a>,
						busque por{' '}
						<a href="https://www.cancer.gov/espanol/tipos">tipo de cáncer</a>, o
						use la casilla de búsqueda en la parte de abajo de esta página.
					</>,
					<>
						¿Tiene una pregunta?{' '}
						<a href="https://www.cancer.gov/espanol/contactenos">Contáctenos</a>
						.
					</>,
			  ]
			: [
					<>We can&apos;t find the page you&apos;re looking for.</>,
					<>
						Visit the <a href="https://www.cancer.gov">homepage</a>, browse by{' '}
						<a href="https://www.cancer.gov/types">cancer type</a>, or use the
						search below.
					</>,
					<>
						Have a question?{' '}
						<a href="https://www.cancer.gov/contact">Get in touch</a>.
					</>,
			  ];

	const executeSearch = (event) => {
		event.preventDefault();
	};

	const renderHelmet = () => {
		return (
			<Helmet>
				<title>{i18n.pageNotFoundTitle[language]}</title>
				<meta property="dcterms.subject" content="Error Pages" />
				<meta property="dcterms.type" content="errorpage" />
			</Helmet>
		);
	};

	const updateTextInput = (event) => {
		const { value } = event.target;
		updateSearchText(value);
	};

	return (
		<>
			{renderHelmet()}
			<div className="error-page">
				<div className="error-content-english">
					<h1>{i18n.pageNotFoundTitle[language]}</h1>
					<>
						{contentPar.map((content, index) => (
							<p key={index}>{content}</p>
						))}
					</>
				</div>
				<div className="error-searchbar">
					<div id="error-form">
						<form
							action="/search/results"
							method="get"
							id="pageNotFoundSearchForm"
							name="pageNotFoundSearchForm"
							data-language="en">
							<label className="show-for-sr" htmlFor="nfKeyword">
								{i18n.search[language]}
							</label>
							<input
								className="searchString ui-autocomplete-input"
								id="nfKeyword"
								maxLength="255"
								name="swKeyword"
								onBlur="bSearchBoxBool=false;"
								onChange={updateTextInput}
								onFocus="bSearchBoxBool=true;"
								value=""
								autoComplete="off"
								aria-autocomplete="list"
								aria-haspopup="true"
								type="text"
							/>
							<button
								className="searchSubmit"
								id="nf-search__button"
								type="submit"
								onClick={executeSearch}>
								{i18n.search[language]}
							</button>
						</form>
					</div>
					{/*<TextInput
						id="keywords"
						action={updateTextInput}
						classes="searchString"
						label={i18n.search[language]}
						labelHidden
					/>
					<input
						type="submit"
						className="submit button postfix"
						id="btnSearch"
						title={i18n.search[language]}
						value={i18n.search[language]}
						onClick={executeSearch}
					/>*/}
				</div>
			</div>
		</>
	);
};

export default PageNotFound;
