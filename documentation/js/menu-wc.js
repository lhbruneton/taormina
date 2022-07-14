'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">taormina documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActionsModule.html" data-type="entity-link" >ActionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActionsModule-43f707d344ceed115f4f3937e998e6b9f765ae6d667094a15b75180682dd1fcc2a2a30776206a6c7b50137d6bd712651f00f6947097ddfc712c0d5f8991895df"' : 'data-target="#xs-components-links-module-ActionsModule-43f707d344ceed115f4f3937e998e6b9f765ae6d667094a15b75180682dd1fcc2a2a30776206a6c7b50137d6bd712651f00f6947097ddfc712c0d5f8991895df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionsModule-43f707d344ceed115f4f3937e998e6b9f765ae6d667094a15b75180682dd1fcc2a2a30776206a6c7b50137d6bd712651f00f6947097ddfc712c0d5f8991895df"' :
                                            'id="xs-components-links-module-ActionsModule-43f707d344ceed115f4f3937e998e6b9f765ae6d667094a15b75180682dd1fcc2a2a30776206a6c7b50137d6bd712651f00f6947097ddfc712c0d5f8991895df"' }>
                                            <li class="link">
                                                <a href="components/ActionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-14c8dd617eee4272e4da03d9c8e73d1baaae44885fb82cc5a9f820c1f0a68160512d3aa74062496caac58f005e7127cc52a86cb81ae903505b8a9a62f4039cce"' : 'data-target="#xs-components-links-module-AppModule-14c8dd617eee4272e4da03d9c8e73d1baaae44885fb82cc5a9f820c1f0a68160512d3aa74062496caac58f005e7127cc52a86cb81ae903505b8a9a62f4039cce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-14c8dd617eee4272e4da03d9c8e73d1baaae44885fb82cc5a9f820c1f0a68160512d3aa74062496caac58f005e7127cc52a86cb81ae903505b8a9a62f4039cce"' :
                                            'id="xs-components-links-module-AppModule-14c8dd617eee4272e4da03d9c8e73d1baaae44885fb82cc5a9f820c1f0a68160512d3aa74062496caac58f005e7127cc52a86cb81ae903505b8a9a62f4039cce"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoardModule.html" data-type="entity-link" >BoardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BoardModule-709106b7f03bab9d0e051927725bd9c4d3b8eb6d2bc3b34b17797d4dc9747d191da90de199f5d73544379451d9a737b7da5c4b7c4f6072a863362582f8f99df9"' : 'data-target="#xs-components-links-module-BoardModule-709106b7f03bab9d0e051927725bd9c4d3b8eb6d2bc3b34b17797d4dc9747d191da90de199f5d73544379451d9a737b7da5c4b7c4f6072a863362582f8f99df9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BoardModule-709106b7f03bab9d0e051927725bd9c4d3b8eb6d2bc3b34b17797d4dc9747d191da90de199f5d73544379451d9a737b7da5c4b7c4f6072a863362582f8f99df9"' :
                                            'id="xs-components-links-module-BoardModule-709106b7f03bab9d0e051927725bd9c4d3b8eb6d2bc3b34b17797d4dc9747d191da90de199f5d73544379451d9a737b7da5c4b7c4f6072a863362582f8f99df9"' }>
                                            <li class="link">
                                                <a href="components/BoardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardBackModule.html" data-type="entity-link" >CardBackModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CardBackModule-02124728600738e8f45362127816f1d71d36e8bd8d41fb31d53473c6436f59ace677e4a2482d7d2012f8d8fae3b076fca7545b2269736496977d31780433ab85"' : 'data-target="#xs-components-links-module-CardBackModule-02124728600738e8f45362127816f1d71d36e8bd8d41fb31d53473c6436f59ace677e4a2482d7d2012f8d8fae3b076fca7545b2269736496977d31780433ab85"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardBackModule-02124728600738e8f45362127816f1d71d36e8bd8d41fb31d53473c6436f59ace677e4a2482d7d2012f8d8fae3b076fca7545b2269736496977d31780433ab85"' :
                                            'id="xs-components-links-module-CardBackModule-02124728600738e8f45362127816f1d71d36e8bd8d41fb31d53473c6436f59ace677e4a2482d7d2012f8d8fae3b076fca7545b2269736496977d31780433ab85"' }>
                                            <li class="link">
                                                <a href="components/CardBackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardBackComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardFrontModule.html" data-type="entity-link" >CardFrontModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CardFrontModule-8ccfb23d0bb980348d0f6ce9771daa7cb9f8789694fa1ecbe13f85c58e62bd6f6de8b41317d4f371070ab2c9725edc1f3f049a288ad905369418a0277bd97117"' : 'data-target="#xs-components-links-module-CardFrontModule-8ccfb23d0bb980348d0f6ce9771daa7cb9f8789694fa1ecbe13f85c58e62bd6f6de8b41317d4f371070ab2c9725edc1f3f049a288ad905369418a0277bd97117"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardFrontModule-8ccfb23d0bb980348d0f6ce9771daa7cb9f8789694fa1ecbe13f85c58e62bd6f6de8b41317d4f371070ab2c9725edc1f3f049a288ad905369418a0277bd97117"' :
                                            'id="xs-components-links-module-CardFrontModule-8ccfb23d0bb980348d0f6ce9771daa7cb9f8789694fa1ecbe13f85c58e62bd6f6de8b41317d4f371070ab2c9725edc1f3f049a288ad905369418a0277bd97117"' }>
                                            <li class="link">
                                                <a href="components/CardFrontComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardFrontComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataAccessGameModule.html" data-type="entity-link" >DataAccessGameModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DataAccessGameModule-693e9d47fc641ed3fd259f4a9ff2dd3ea37d1da7814829a979052640e1cda3dba6f1dfdbde1ebdc00a8696fb504d4c5e9e0affbdcc7fc75e3b344648b98cdddb"' : 'data-target="#xs-injectables-links-module-DataAccessGameModule-693e9d47fc641ed3fd259f4a9ff2dd3ea37d1da7814829a979052640e1cda3dba6f1dfdbde1ebdc00a8696fb504d4c5e9e0affbdcc7fc75e3b344648b98cdddb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DataAccessGameModule-693e9d47fc641ed3fd259f4a9ff2dd3ea37d1da7814829a979052640e1cda3dba6f1dfdbde1ebdc00a8696fb504d4c5e9e0affbdcc7fc75e3b344648b98cdddb"' :
                                        'id="xs-injectables-links-module-DataAccessGameModule-693e9d47fc641ed3fd259f4a9ff2dd3ea37d1da7814829a979052640e1cda3dba6f1dfdbde1ebdc00a8696fb504d4c5e9e0affbdcc7fc75e3b344648b98cdddb"' }>
                                        <li class="link">
                                            <a href="injectables/AgglomerationPilesCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgglomerationPilesCardsFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiscardPileCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscardPileCardsFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DomainsCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DomainsCardsFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventsPileCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsPileCardsFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GameFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GameFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HandsCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HandsCardsFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LandsPileCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandsPileCardsFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockPilesCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockPilesCardsFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiceModule.html" data-type="entity-link" >DiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DiceModule-27100e353a5dd2a4f9c1ec152d2fb1e7bb67013091ec86d765505291d4b4f2f1cecda0b7fe23d02f60fc2f5a8d224e79ed9c0150f32e140fe29569735d7c2e39"' : 'data-target="#xs-components-links-module-DiceModule-27100e353a5dd2a4f9c1ec152d2fb1e7bb67013091ec86d765505291d4b4f2f1cecda0b7fe23d02f60fc2f5a8d224e79ed9c0150f32e140fe29569735d7c2e39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DiceModule-27100e353a5dd2a4f9c1ec152d2fb1e7bb67013091ec86d765505291d4b4f2f1cecda0b7fe23d02f60fc2f5a8d224e79ed9c0150f32e140fe29569735d7c2e39"' :
                                            'id="xs-components-links-module-DiceModule-27100e353a5dd2a4f9c1ec152d2fb1e7bb67013091ec86d765505291d4b4f2f1cecda0b7fe23d02f60fc2f5a8d224e79ed9c0150f32e140fe29569735d7c2e39"' }>
                                            <li class="link">
                                                <a href="components/DiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DomainModule.html" data-type="entity-link" >DomainModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DomainModule-a7f877cb2cc8b0577049fa5a049dfa1b67d4d391de8491842c1072ce845f7e78e43fee3d52f62fa7b331a9cebf653953a00bbc8ff4bd94f5809067152c701158"' : 'data-target="#xs-components-links-module-DomainModule-a7f877cb2cc8b0577049fa5a049dfa1b67d4d391de8491842c1072ce845f7e78e43fee3d52f62fa7b331a9cebf653953a00bbc8ff4bd94f5809067152c701158"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DomainModule-a7f877cb2cc8b0577049fa5a049dfa1b67d4d391de8491842c1072ce845f7e78e43fee3d52f62fa7b331a9cebf653953a00bbc8ff4bd94f5809067152c701158"' :
                                            'id="xs-components-links-module-DomainModule-a7f877cb2cc8b0577049fa5a049dfa1b67d4d391de8491842c1072ce845f7e78e43fee3d52f62fa7b331a9cebf653953a00bbc8ff4bd94f5809067152c701158"' }>
                                            <li class="link">
                                                <a href="components/DomainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DomainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeatureEngineModule.html" data-type="entity-link" >FeatureEngineModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeatureGameModule.html" data-type="entity-link" >FeatureGameModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HandModule.html" data-type="entity-link" >HandModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HandModule-2b38c9aec150b2921bded470453b514d0cde17829b3774d3595dfabb176b5b9a2f0e59537002b702f3bce369805ff9b2b4928c7290a1b14d92b376e54df70ef1"' : 'data-target="#xs-components-links-module-HandModule-2b38c9aec150b2921bded470453b514d0cde17829b3774d3595dfabb176b5b9a2f0e59537002b702f3bce369805ff9b2b4928c7290a1b14d92b376e54df70ef1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HandModule-2b38c9aec150b2921bded470453b514d0cde17829b3774d3595dfabb176b5b9a2f0e59537002b702f3bce369805ff9b2b4928c7290a1b14d92b376e54df70ef1"' :
                                            'id="xs-components-links-module-HandModule-2b38c9aec150b2921bded470453b514d0cde17829b3774d3595dfabb176b5b9a2f0e59537002b702f3bce369805ff9b2b4928c7290a1b14d92b376e54df70ef1"' }>
                                            <li class="link">
                                                <a href="components/HandComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HandComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PhasesModule.html" data-type="entity-link" >PhasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PhasesModule-a7fed1c72c7545642a0c28213d0d4d19433260220a1ac38b20a33e437d101372448b010d131b4c3057cf1e95b69ce75153b436cb7d3c769a4e44496c026f595e"' : 'data-target="#xs-components-links-module-PhasesModule-a7fed1c72c7545642a0c28213d0d4d19433260220a1ac38b20a33e437d101372448b010d131b4c3057cf1e95b69ce75153b436cb7d3c769a4e44496c026f595e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PhasesModule-a7fed1c72c7545642a0c28213d0d4d19433260220a1ac38b20a33e437d101372448b010d131b4c3057cf1e95b69ce75153b436cb7d3c769a4e44496c026f595e"' :
                                            'id="xs-components-links-module-PhasesModule-a7fed1c72c7545642a0c28213d0d4d19433260220a1ac38b20a33e437d101372448b010d131b4c3057cf1e95b69ce75153b436cb7d3c769a4e44496c026f595e"' }>
                                            <li class="link">
                                                <a href="components/PhasesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhasesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PilesModule.html" data-type="entity-link" >PilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PilesModule-9d72bbc4d73b2430331fcb812fba3c5109b7c419a769e0d33672a24b7f62366605d6ac62204baaaecb91b2247c69bfb63913ccd91076663a52415fa890323eb7"' : 'data-target="#xs-components-links-module-PilesModule-9d72bbc4d73b2430331fcb812fba3c5109b7c419a769e0d33672a24b7f62366605d6ac62204baaaecb91b2247c69bfb63913ccd91076663a52415fa890323eb7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PilesModule-9d72bbc4d73b2430331fcb812fba3c5109b7c419a769e0d33672a24b7f62366605d6ac62204baaaecb91b2247c69bfb63913ccd91076663a52415fa890323eb7"' :
                                            'id="xs-components-links-module-PilesModule-9d72bbc4d73b2430331fcb812fba3c5109b7c419a769e0d33672a24b7f62366605d6ac62204baaaecb91b2247c69bfb63913ccd91076663a52415fa890323eb7"' }>
                                            <li class="link">
                                                <a href="components/PilesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PilesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiCardModule.html" data-type="entity-link" >UiCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiCardModule-d2f6bb0d2d6f86d00a485a2d282f4b5e409028ed8b614398daf97bd1920fdd4c5a7328cfbf4b5a43a2b67cb83e11ec0de838e0f80544c743244660ef61c3c598"' : 'data-target="#xs-components-links-module-UiCardModule-d2f6bb0d2d6f86d00a485a2d282f4b5e409028ed8b614398daf97bd1920fdd4c5a7328cfbf4b5a43a2b67cb83e11ec0de838e0f80544c743244660ef61c3c598"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiCardModule-d2f6bb0d2d6f86d00a485a2d282f4b5e409028ed8b614398daf97bd1920fdd4c5a7328cfbf4b5a43a2b67cb83e11ec0de838e0f80544c743244660ef61c3c598"' :
                                            'id="xs-components-links-module-UiCardModule-d2f6bb0d2d6f86d00a485a2d282f4b5e409028ed8b614398daf97bd1920fdd4c5a7328cfbf4b5a43a2b67cb83e11ec0de838e0f80544c743244660ef61c3c598"' }>
                                            <li class="link">
                                                <a href="components/CardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AgglomerationPilesCardsEffects.html" data-type="entity-link" >AgglomerationPilesCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiscardPileCardsEffects.html" data-type="entity-link" >DiscardPileCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DomainsCardsEffects.html" data-type="entity-link" >DomainsCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsPileCardsEffects.html" data-type="entity-link" >EventsPileCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GameEffects.html" data-type="entity-link" >GameEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GameRulesService.html" data-type="entity-link" >GameRulesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HandsCardsEffects.html" data-type="entity-link" >HandsCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LandsPileCardsEffects.html" data-type="entity-link" >LandsPileCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StockPilesCardsEffects.html" data-type="entity-link" >StockPilesCardsEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionCard.html" data-type="entity-link" >ActionCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgglomerationCard.html" data-type="entity-link" >AgglomerationCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgglomerationPilesCardsEntity.html" data-type="entity-link" >AgglomerationPilesCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgglomerationPilesCardsPartialState.html" data-type="entity-link" >AgglomerationPilesCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgglomerationPilesCardsState.html" data-type="entity-link" >AgglomerationPilesCardsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CanPrint.html" data-type="entity-link" >CanPrint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Chainable.html" data-type="entity-link" >Chainable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Chainable-1.html" data-type="entity-link" >Chainable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DevelopmentCard.html" data-type="entity-link" >DevelopmentCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiscardPileCardsEntity.html" data-type="entity-link" >DiscardPileCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiscardPileCardsPartialState.html" data-type="entity-link" >DiscardPileCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiscardPileCardsState.html" data-type="entity-link" >DiscardPileCardsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Domain.html" data-type="entity-link" >Domain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DomainsCardsEntity.html" data-type="entity-link" >DomainsCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DomainsCardsPartialState.html" data-type="entity-link" >DomainsCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DomainsCardsState.html" data-type="entity-link" >DomainsCardsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventCard.html" data-type="entity-link" >EventCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventsPileCardsEntity.html" data-type="entity-link" >EventsPileCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventsPileCardsPartialState.html" data-type="entity-link" >EventsPileCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventsPileCardsState.html" data-type="entity-link" >EventsPileCardsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GamePartialState.html" data-type="entity-link" >GamePartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GameState.html" data-type="entity-link" >GameState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Hand.html" data-type="entity-link" >Hand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HandsCardsEntity.html" data-type="entity-link" >HandsCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HandsCardsPartialState.html" data-type="entity-link" >HandsCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HandsCardsState.html" data-type="entity-link" >HandsCardsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasColor.html" data-type="entity-link" >HasColor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasCost.html" data-type="entity-link" >HasCost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasId.html" data-type="entity-link" >HasId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasName.html" data-type="entity-link" >HasName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasRules.html" data-type="entity-link" >HasRules</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasVictoryPoints.html" data-type="entity-link" >HasVictoryPoints</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LandCard.html" data-type="entity-link" >LandCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LandsPileCardsEntity.html" data-type="entity-link" >LandsPileCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LandsPileCardsPartialState.html" data-type="entity-link" >LandsPileCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LandsPileCardsState.html" data-type="entity-link" >LandsPileCardsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockPilesCardsEntity.html" data-type="entity-link" >StockPilesCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockPilesCardsPartialState.html" data-type="entity-link" >StockPilesCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockPilesCardsState.html" data-type="entity-link" >StockPilesCardsState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});