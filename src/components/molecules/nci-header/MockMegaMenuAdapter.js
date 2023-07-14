export class MockMegaMenuAdapter {
	useUrlForNavigationId = true;

	getMegaMenuContent() {
		const megaMenuContent = document.createElement('div');

		// language=HTML
		megaMenuContent.innerHTML = `
			<div id='megamenu-layer' class='nci-megamenu'>
				<div class='grid-container'>
					<div class='grid-row grid-gap'>
						<div class='grid-col-3 nci-megamenu__primary-pane'>
							<a class='nci-megamenu__primary-link' href='#'>Explore Section</a>
						</div>
						<div class='nci-megamenu__items-pane grid-col-9'>
							<div class='grid-row grid-gap'>
								<div class='grid-col-4'>
									<ul class='nci-megamenu__list'>
										<li class='nci-megamenu__list-item'>
											<a class='nci-megamenu__list-item-link' href='#'>Section Header</a>
											<ul class='nci-megamenu__sublist'>
												<li class='nci-megamenu__sublist-item'>
													<a class='nci-megamenu__sublist-item-link' href='#'>Navigation link</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a class='nci-megamenu__sublist-item-link' href='#'>Navigation link</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div class='grid-col-4'>
									<ul class='nci-megamenu__list'>
										<li class='nci-megamenu__list-item'>
											<a class='nci-megamenu__list-item-link' href='#'>
												Section Header
											</a>
											<ul class='nci-megamenu__sublist'>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														A very long navigation link that goes onto two lines
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														A very long navigation link that goes onto two lines
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div class='grid-col-4'>
									<ul class='nci-megamenu__list'>
										<li class='nci-megamenu__list-item'>
											<a class='nci-megamenu__list-item-link' href='#'>
												Section Header
											</a>
											<ul class='nci-megamenu__sublist'>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
							<div class='grid-row grid-gap'>
								<div class='grid-col-4'>
									<ul class='nci-megamenu__list'>
										<li class='nci-megamenu__list-item'>
											<a class='nci-megamenu__list-item-link' href='#'>
												Section Header
											</a>
											<ul class='nci-megamenu__sublist'>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														A very long navigation link that goes onto two lines
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div class='grid-col-4'>
									<ul class='nci-megamenu__list'>
										<li class='nci-megamenu__list-item'>
											<a class='nci-megamenu__list-item-link' href='#'>
												Section Header
											</a>
											<ul class='nci-megamenu__sublist'>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div class='grid-col-4'>
									<ul class='nci-megamenu__list'>
										<li class='nci-megamenu__list-item'>
											<a class='nci-megamenu__list-item-link' href='#'>
												Section Header
											</a>
											<ul class='nci-megamenu__sublist'>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														Navigation link
													</a>
												</li>
												<li class='nci-megamenu__sublist-item'>
													<a href='#'>
														A very long navigation link that goes onto two lines
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		return megaMenuContent;
	}
}