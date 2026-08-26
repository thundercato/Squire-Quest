'use strict'

// Marketplace alley reveal and forgiving entry commands.
// This deliberately sits in a small hotfix module so the behaviour is easy to fold
// into the main puzzle module once the room-by-room polish pass reaches Market.

sqCmd('SqRevealMarketAlleyHotfix', [
  /^(?:examine|look at|look behind|search|inspect|investigate|check|study|move|shift|move aside|push aside) (?:the )?(?:crates|barrels|boxes|clutter|market clutter|market crates|market barrels|rear clutter|back clutter)$/i,
  /^(?:search|inspect|investigate|check|examine) (?:the )?(?:rear|back) (?:of )?(?:the )?market$/i
], function () {
  if (!sqHere('market')) return sqFail('That particular clutter is not here.')
  sq.alleyRevealed = true
  return sqMsg('You investigate the crates, barrels and general market clutter. Behind it, a dark narrow alley is revealed leading NORTHWEST. You can go NORTHWEST or ENTER ALLEYWAY.')
})

sqCmd('SqEnterMarketAlleyHotfix', [
  /^(?:northwest|north west|nw)$/i,
  /^(?:go|walk|move|head|travel) (?:to the )?(?:northwest|north west|nw)$/i,
  /^(?:enter|go into|walk into|head into|take|use) (?:the )?(?:alley|alleyway|narrow alley|dark alley)$/i
], function () {
  if (!sqHere('market')) return sqFail('There is no market alley entrance here.')
  if (!sq.alleyRevealed) return sqFail('You cannot see any route northwest until you investigate the market clutter.')
  return sqMovePlayer('alleyway', 'You squeeze past the shifted market clutter and enter the narrow alleyway.')
})
