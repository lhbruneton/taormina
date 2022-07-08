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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ed77da45044d196dcfcad70f6d735716ca1a703c5482fa5cbcd9a0db8f8e7a262adf902419e8472a3dc36b84a4ac1f6eff4eca7854ad0dffd2755502113c42a8"' : 'data-target="#xs-components-links-module-AppModule-ed77da45044d196dcfcad70f6d735716ca1a703c5482fa5cbcd9a0db8f8e7a262adf902419e8472a3dc36b84a4ac1f6eff4eca7854ad0dffd2755502113c42a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ed77da45044d196dcfcad70f6d735716ca1a703c5482fa5cbcd9a0db8f8e7a262adf902419e8472a3dc36b84a4ac1f6eff4eca7854ad0dffd2755502113c42a8"' :
                                            'id="xs-components-links-module-AppModule-ed77da45044d196dcfcad70f6d735716ca1a703c5482fa5cbcd9a0db8f8e7a262adf902419e8472a3dc36b84a4ac1f6eff4eca7854ad0dffd2755502113c42a8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataAccessGameModule.html" data-type="entity-link" >DataAccessGameModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DataAccessGameModule-e3f943e41687a42c0f99fbc895bd2fa82fde8c6eeda3734a55c62e03a1b502f80beef7e6f685614a4ea1a6d1cc0fb50e3b7f591de6399be079726c684efaa901"' : 'data-target="#xs-injectables-links-module-DataAccessGameModule-e3f943e41687a42c0f99fbc895bd2fa82fde8c6eeda3734a55c62e03a1b502f80beef7e6f685614a4ea1a6d1cc0fb50e3b7f591de6399be079726c684efaa901"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DataAccessGameModule-e3f943e41687a42c0f99fbc895bd2fa82fde8c6eeda3734a55c62e03a1b502f80beef7e6f685614a4ea1a6d1cc0fb50e3b7f591de6399be079726c684efaa901"' :
                                        'id="xs-injectables-links-module-DataAccessGameModule-e3f943e41687a42c0f99fbc895bd2fa82fde8c6eeda3734a55c62e03a1b502f80beef7e6f685614a4ea1a6d1cc0fb50e3b7f591de6399be079726c684efaa901"' }>
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
                                            <a href="injectables/FaceUpPilesCardsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FaceUpPilesCardsFacade</a>
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
                                <a href="modules/FeatureEngineModule.html" data-type="entity-link" >FeatureEngineModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UiCardModule.html" data-type="entity-link" >UiCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiCardModule-30be0ff8519d2d33e05404308c74534e5aabb6e5dfbc6d9925da2bd191a3bef247f8c299d35df5184e9aa4e32168827dbd72ab4829944886b20ca2dfb9001512"' : 'data-target="#xs-components-links-module-UiCardModule-30be0ff8519d2d33e05404308c74534e5aabb6e5dfbc6d9925da2bd191a3bef247f8c299d35df5184e9aa4e32168827dbd72ab4829944886b20ca2dfb9001512"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiCardModule-30be0ff8519d2d33e05404308c74534e5aabb6e5dfbc6d9925da2bd191a3bef247f8c299d35df5184e9aa4e32168827dbd72ab4829944886b20ca2dfb9001512"' :
                                            'id="xs-components-links-module-UiCardModule-30be0ff8519d2d33e05404308c74534e5aabb6e5dfbc6d9925da2bd191a3bef247f8c299d35df5184e9aa4e32168827dbd72ab4829944886b20ca2dfb9001512"' }>
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
                                    <a href="injectables/DiscardPileCardsEffects.html" data-type="entity-link" >DiscardPileCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DomainsCardsEffects.html" data-type="entity-link" >DomainsCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsPileCardsEffects.html" data-type="entity-link" >EventsPileCardsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FaceUpPilesCardsEffects.html" data-type="entity-link" >FaceUpPilesCardsEffects</a>
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
                                <a href="interfaces/FaceUpPilesCardsEntity.html" data-type="entity-link" >FaceUpPilesCardsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FaceUpPilesCardsPartialState.html" data-type="entity-link" >FaceUpPilesCardsPartialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FaceUpPilesCardsState.html" data-type="entity-link" >FaceUpPilesCardsState</a>
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