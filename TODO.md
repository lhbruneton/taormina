### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L355) | 355 | test actions order: event > steal on thieves > production
| [libs/data-access-game/src/lib/+state/stock-piles-cards/stock-piles-cards.effects.ts](libs/data-access-game/src/lib/+state/stock-piles-cards/stock-piles-cards.effects.ts#L67) | 67 | throw error instead of filtering out undefined ?

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L661) | 661 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L697) | 697 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L796) | 796 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L832) | 832 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L925) | 925 | should test error thrown
| [libs/feature-engine/src/lib/game-rules.service.spec.ts](libs/feature-engine/src/lib/game-rules.service.spec.ts#L960) | 960 | should test error thrown
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.spec.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.spec.ts#L794) | 794 | https://github.com/ngrx/platform/issues/2176

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
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L253) | 253 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L355) | 355 | @typescript-eslint/no-unused-vars
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.selectors.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.selectors.ts#L206) | 206 | @typescript-eslint/no-non-null-assertion
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.selectors.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.selectors.ts#L275) | 275 | @typescript-eslint/no-non-null-assertion
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
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L192) | 192 | 
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L194) | 194 | 
| [libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts](libs/data-access-game/src/lib/+state/domains-cards/domains-cards.effects.ts#L283) | 283 | 
