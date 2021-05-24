### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L522) | 522 | test actions order: event > steal on thieves > production
| [libs/data-access-game/src/lib/+state/stock-piles-cards/stock-piles-cards.effects.ts](libs/data-access-game/src/lib/+state/stock-piles-cards/stock-piles-cards.effects.ts#L67) | 67 | throw error instead of filtering out undefined ?

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L828) | 828 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L864) | 864 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L963) | 963 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L999) | 999 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L1092) | 1092 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L1127) | 1127 | should test error thrown
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.spec.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.spec.ts#L794) | 794 | https://github.com/ngrx/platform/issues/2176
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.spec.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.spec.ts#L820) | 820 | https://github.com/ngrx/platform/issues/2176

### ESLINT-DISABLE-NEXT-LINEs
| Filename | line # | ESLINT-DISABLE-NEXT-LINE
|:------|:------:|:------
| [libs/shared-models/src/lib/interfaces/name.ts](libs/shared-models/src/lib/interfaces/name.ts#L5) | 5 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/interfaces/print.ts](libs/shared-models/src/lib/interfaces/print.ts#L5) | 5 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/structures/action.ts](libs/shared-models/src/lib/structures/action.ts#L24) | 24 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/structures/agglomeration.ts](libs/shared-models/src/lib/structures/agglomeration.ts#L95) | 95 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/structures/development.ts](libs/shared-models/src/lib/structures/development.ts#L111) | 111 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/structures/event.ts](libs/shared-models/src/lib/structures/event.ts#L24) | 24 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/structures/land.ts](libs/shared-models/src/lib/structures/land.ts#L37) | 37 | @typescript-eslint/no-explicit-any
| [libs/shared-models/src/lib/types/dice.ts](libs/shared-models/src/lib/types/dice.ts#L1) | 1 | no-magic-numbers
| [libs/shared-models/src/lib/types/resources.ts](libs/shared-models/src/lib/types/resources.ts#L19) | 19 | no-magic-numbers
| [libs/data-access-game/src/lib/+state/discard-pile-cards/discard-pile-cards.reducer.ts](libs/data-access-game/src/lib/+state/discard-pile-cards/discard-pile-cards.reducer.ts#L21) | 21 | max-len
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L85) | 85 | no-magic-numbers
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L160) | 160 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L262) | 262 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L364) | 364 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.selectors.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.selectors.ts#L225) | 225 | @typescript-eslint/no-non-null-assertion
| [libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts](libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts#L51) | 51 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts](libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts#L68) | 68 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts](libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts#L70) | 70 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts](libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.effects.ts#L73) | 73 | @typescript-eslint/no-non-null-assertion
| [libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.reducer.ts](libs/data-access-game/src/lib/+state/events-pile-cards/events-pile-cards.reducer.ts#L21) | 21 | max-len
| [libs/data-access-game/src/lib/+state/face-up-piles-cards/face-up-piles-cards.reducer.ts](libs/data-access-game/src/lib/+state/face-up-piles-cards/face-up-piles-cards.reducer.ts#L21) | 21 | max-len
| [libs/data-access-game/src/lib/+state/game/game.effects.ts](libs/data-access-game/src/lib/+state/game/game.effects.ts#L32) | 32 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/stock-piles-cards/stock-piles-cards.reducer.ts](libs/data-access-game/src/lib/+state/stock-piles-cards/stock-piles-cards.reducer.ts#L21) | 21 | max-len

### PRETTIER-IGNOREs
| Filename | line # | PRETTIER-IGNORE
|:------|:------:|:------
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L201) | 201 | 
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L203) | 203 | 
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L292) | 292 | 
