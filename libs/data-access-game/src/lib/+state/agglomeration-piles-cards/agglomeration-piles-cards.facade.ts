import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ID_AGGLOMERATION_HAMLET,
  ID_AGGLOMERATION_ROAD,
  ID_AGGLOMERATION_TOWN,
} from '@taormina/shared-constants';

import * as AgglomerationPilesCardsActions from './agglomeration-piles-cards.actions';
import * as AgglomerationPilesCardsFeature from './agglomeration-piles-cards.reducer';
import * as AgglomerationPilesCardsSelectors from './agglomeration-piles-cards.selectors';

@Injectable()
export class AgglomerationPilesCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(AgglomerationPilesCardsSelectors.getAgglomerationPilesCardsLoaded)
  );
  allAgglomerationPilesCards$ = this.store.pipe(
    select(AgglomerationPilesCardsSelectors.getAllAgglomerationPilesCards)
  );
  selectedAgglomerationPilesCards$ = this.store.pipe(
    select(AgglomerationPilesCardsSelectors.getAgglomerationSelected)
  );
  allRoadPivots$ = this.store.select(
    AgglomerationPilesCardsSelectors.getCardPivotsForPile(ID_AGGLOMERATION_ROAD)
  );
  allHamletPivots$ = this.store.select(
    AgglomerationPilesCardsSelectors.getCardPivotsForPile(
      ID_AGGLOMERATION_HAMLET
    )
  );
  allTownPivots$ = this.store.select(
    AgglomerationPilesCardsSelectors.getCardPivotsForPile(ID_AGGLOMERATION_TOWN)
  );

  constructor(
    private store: Store<AgglomerationPilesCardsFeature.AgglomerationPilesCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(
      AgglomerationPilesCardsActions.initAgglomerationNewGame()
    );
  }

  initSavedGame(): void {
    this.store.dispatch(
      AgglomerationPilesCardsActions.initAgglomerationSavedGame()
    );
  }

  removeAgglomerationPileCard(id: string): void {
    this.store.dispatch(
      AgglomerationPilesCardsActions.removeAgglomerationPileCard({ id })
    );
  }

  selectFirstCardFromAgglomerationPile(pileId: string): void {
    this.store.dispatch(
      AgglomerationPilesCardsActions.selectFirstCardFromAgglomerationPile({
        pileId,
      })
    );
  }
}
