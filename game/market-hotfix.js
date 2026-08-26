'use strict'

sqCmd('SqRevealAlleyExpanded', [
  /^(?:examine|investigate|search|inspect|look at|look behind|check|move|shift|rummage through) (?:the )?(?:crates?|barrels?|boxes?|clutter|market clutter|market crates?|market barrels?)$/i,
  /^(?:examine|investigate|search|inspect|check) (?:the )?(?:rear|back) (?:of )?(?:the )?market$/i
], function () {
  if (!sqHere('market')) return sqFail('There is no useful market clutter here.')
  sq.alleyRevealed = true
  return sqMsg('Behind the crates, barrels and market clutter you discover a dark, narrow alley leading NORTHWEST.')
})

sqCmd('SqEnterRevealedAlley', [
  /^(?:enter|go into|walk into|head into|move into|take|use) (?:the )?(?:alley|alleyway|narrow alley|dark alley)$/i
], function () {
  if (!sqHere('market')) return sqFail('There is no alleyway entrance here.')
  if (!sq.alleyRevealed) return sqFail('You cannot see an alleyway entrance until you investigate the market clutter.')
  return sqMovePlayer('alleyway', 'You squeeze past the market clutter and enter the narrow alleyway.')
})
