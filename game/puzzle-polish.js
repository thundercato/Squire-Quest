'use strict'

// Targeted typo normalisation. This deliberately fixes common parser pain without
// guessing wildly at the player's intent.
settings.parserPreprocessor = function(input) {
  if (!input) return input
  let s = input.toLowerCase().trim().replace(/\s+/g, ' ')
  const replacements = [
    [/\bseaguls?\b/g,'seagulls'], [/\bsea gulls?\b/g,'seagulls'],
    [/\bbarrells?\b/g,'barrels'], [/\bbarrell\b/g,'barrel'],
    [/\bcrats\b/g,'crates'], [/\bgang plank\b/g,'gangplank'],
    [/\bkamalot\b/g,'kamalot'], [/\bkamelot\b/g,'kamalot'], [/\bcamelot\b/g,'kamalot'],
    [/\bfisher man\b/g,'fisherman'], [/\bprinces\b/g,'princess'],
    [/\bchieftan\b/g,'chieftain'], [/\bcheiftain\b/g,'chieftain'],
    [/\bsouth west\b/g,'southwest'], [/\bsouth east\b/g,'southeast'],
    [/\bnorth west\b/g,'northwest'], [/\bnorth east\b/g,'northeast'],
    [/\bfiery fava bean sample\b/g,'fiery fava beans sample'],
    [/\bprostetic\b/g,'prosthetic'], [/\bbroch\b/g,'brooch'],
  ]
  replacements.forEach(function(pair){ s=s.replace(pair[0],pair[1]) })
  return s
}

// First arrival at the Southern Gate gets the short Biff exchange, but it is not
// a persuasion puzzle. His name becomes known through conversation.
sq.biffIntroduced = false
w.southern_gate.north = new Exit('tourist_information', {
  use:function(){
    if (!sq.biffIntroduced) {
      sq.biffIntroduced = true
      msg('The huge guard plants himself in your path. “Where do you think you’re going, butthead?” You explain that you are Sir Arrogant’s squire. He thinks about this for several visible seconds. “Fine. Go through.” He steps aside with the air of a man who has personally authorised the castle.')
    }
    player.moveChar(this); return true
  }
})
sqCmd('SqTalkBiff', /^(?:talk|speak|chat|ask)(?: to| with)? (?:the )?(?:guard|castle guard|big guard|biff)$/i, function(){
  if (!sqHere('southern_gate')) return sqFail('That particular guard is not here.')
  sq.biffIntroduced = true
  return sqMsg('“Biff,” says the guard, tapping his breastplate. “King’s Guard. Very important.” He pauses. “Mostly the guarding bit.”')
})
sqCmd('SqGateSideways', [/^(?:go|walk|head|move) (?:east|west)$/i,/^(?:enter|go into|walk into|climb into|hide in) (?:the )?(?:bushes|foliage|undergrowth)$/i], function(){
  if (!sqHere('southern_gate')) return sqFail('There is no reason to force a route that way.')
  return sqFail('Dense foliage crowds the castle wall, and the guard watches you with the expression of a man delighted to have found something suspicious. The actual route is NORTH or SOUTH.')
})

// The voucher, rather than merely owning it, activates the bean promotion.
const sqGiveChickenCommand = findCmd('SqGiveChickenKfc')
if (sqGiveChickenCommand) sqGiveChickenCommand.script = function(){
  if (!sqHere('kfc_inside')) return sqFail('The KFC server is not here.')
  if (!sqHas('sq_fresh_chicken')) return sqFail('You do not have a fresh chicken.')
  sqRemove('sq_fresh_chicken'); sq.chickenDelivered=true; sq.beansAvailable=false; sq.bellAvailable=true; sq.stage='flour'
  return sqMsg('The server accepts the bird. “Excellent. Next we need flour from Old Man Emmett’s mill west of the castle.” She points to the Fiery Fava Beans station. “If you’ve got one of our vouchers, I can activate the free samples.” Outside, 4U becomes BELLS 4U.')
}

// One gold coin buys the knight a continuing round. This matches the finite
// three-coin puzzle economy: spices, tavern round, Wood 4U branch.
const sqDrinkCommand = findCmd('SqBuyDrink')
if (sqDrinkCommand) sqDrinkCommand.script = function(){
  if (!sqHere('dragons_maw_inside')) return sqFail('You are not in the tavern.')
  if (sq.armStolen) return sqMsg('Buying more drink for the unconscious one-armed war hero would be excessive.')
  const coin=['sq_dropped_coin','sq_tree_coin','sq_gold_coin'].find(sqHas)
  if (!coin) return sqFail('The bartender introduces the radical tavern policy of requiring money.')
  sqRemove(coin); sq.sirSoInSoDrinks=3; sq.armStolen=true; w.sq_scraps.loc='southern_gate'; w.sq_beggar_later.loc='southern_gate'; sq.dogAtBeggar=true
  return sqMsg('You buy Sir SoInSo a round. The bartender keeps his cup topped up while the old knight retells the Fire-Ra battle with steadily decreasing geographical accuracy. After several trips to the toilet he collapses face-first on the table. His wooden arm rolls free. Scraps wakes instantly, grabs it and bolts from the tavern.')
}

// Extra scenery coverage for puzzle-significant things the walkthrough expects
// players to notice and experiment with.
sqScenery('sq_bean_station','kfc_inside','Fiery Fava Beans station',['bean station','beans station','samples','sample station'],function(){return sq.beansAvailable?'The promotional station is active and offering free Fiery Fava Beans samples and refills.':'The promotional station is currently inactive.'})
sqScenery('sq_mill_stone','old_mill_inside','mill stone',['millstone','grinding stone','stone'],'A large mill stone. Its rough edge looks capable of sharpening a suitably blunt knife.')
sqScenery('sq_market_stalls','market','market stalls',['stalls','stall','fruit','meat','herbs','spices'],'Colourful market stalls sell fruit, meat, herbs and spices from across the kingdom.')
sqScenery('sq_tavern_fire','dragons_maw_inside','fireplace',['fire','hearth','fire place'],'A smoky fire crackles in the hearth and makes the ancient tavern marginally less damp.')
sqScenery('sq_tavern_barrels','dragons_maw_inside','barrels',['barrel','casks','cask'],'Ale barrels line the old timber walls.')
sqScenery('sq_tavern_patrons','dragons_maw_inside','patrons',['customers','drinkers','people'],'A collection of locals and visiting tournament-goers drink with varying degrees of professionalism.')
sqScenery('sq_forest_trolls','forest_clearing','trolls',['troll','two trolls'],function(){return sq.princessRescued?'The trolls have fled. Even the undergrowth looks relieved.':'Two trolls have cornered a hooded figure. They look considerably less brave than they do large.'})
sqScenery('sq_hooded_figure','forest_clearing','hooded figure',['figure','hooded woman'],function(){return sq.princessRescued?'The hooded figure was the Princess.':'A hooded figure is being menaced by the trolls.'})
sqScenery('sq_waterfall_opening','waterfall','rock opening',['opening','hole','round opening'],function(){return sq.waterfallRestored?'The opening is hidden behind the restored waterfall.':'A rounded opening high in the rock marks where a much larger flow of water ought to be.'})
sqScenery('sq_plateau_view','plateau','view',['forest','castle','valley'],'From the plateau the forest spreads below, with Castle Kamalot visible in the distance.')
sqScenery('sq_dungeon_door','dungeon_cell','cell door',['door','locked door','prison door'],'A heavy locked cell door. Brute force would achieve little beyond entertaining the guard.')

// A few natural alternative phrasings used repeatedly by modern players.
sqCmd('SqAskFishermanBait', /^(?:ask|question) (?:the )?(?:fisherman|angler) (?:for|about) (?:bait|fish|fishing)$/i, function(){
  if (!sqHere('western_dock') || !sq.fishermanActive) return sqFail('There is no fisherman here.')
  sq.fishermanInformed=true
  return sqMsg('The fisherman says he needs worms, maggots or something equally wriggly for bait. “These days it’s all phishing scams.”')
})
sqCmd('SqAskStanChicken', /^(?:ask|talk to|question) (?:stan|salesman|shopkeeper) (?:for|about) (?:chicken|a chicken|fresh chicken)$/i, function(){
  if (!sqHere('four_u_inside')) return sqFail('Stan is not here.')
  if (!sq.chickenRequested || sq.chickenDelivered) return sqMsg('Stan launches into a sales pitch for something you did not ask about.')
  return sqMsg('“Welcome to CHICKEN 4U!” says Stan. He offers rubber chickens, ornamental chickens, chicken-shaped mugs and several things that are legally poultry-adjacent. Fresh edible chicken is, naturally, out of stock.')
})
