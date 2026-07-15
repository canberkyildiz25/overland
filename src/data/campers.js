/* ═══════════════════════════════════════════════════════════
   OVERLAND — fleet data (hand-written, no external API)
   All rigs, locations and reviews are original US-themed content.
   Hero photos: 4 from Unsplash + 4 CC-licensed (Openverse) in /public/rigs.
   Every rig has a unique hero image.
   ═══════════════════════════════════════════════════════════ */

const U = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fit=crop`

/* atmosphere frames (Unsplash) reused across galleries */
const A = {
  tent:    '1504280390367-361c6d9f38f4',
  lake:    '1449057528837-7ca097b3520c',
  starMtn: '1519681393784-d120267933ba',
  snowMtn: '1470770903676-69b98201ea1c',
  dawn:    '1533873984035-25970ab07461',
  fire:    '1478131143081-80f7f84ca84d',
}

/* hero image: Unsplash id OR a local /rigs path */
const heroSrc = (hero, w) => (hero.startsWith('/') ? hero : U(hero, w))

const gallery = (hero, ...atmosphereIds) => [
  { thumb: heroSrc(hero, 600), original: heroSrc(hero, 1400) },
  ...atmosphereIds.map(id => ({ thumb: U(id, 600), original: U(id, 1400) })),
]

export const campers = [
  {
    id: 'ov-01',
    name: 'Sierra Nomad 21',
    price: 189,
    rating: 4.8,
    location: 'Moab, Utah',
    form: 'van',
    description:
      'A nimble camper van built for red-rock country. Compact enough for tight trailheads, kitted enough to live in for weeks. Solar on the roof, a proper galley inside, and a bed that faces the sunrise.',
    length: '5.9 m', width: '2.1 m', height: '2.6 m',
    tank: '90 L', consumption: '11.5 L/100km',
    transmission: 'automatic', engine: 'diesel',
    AC: true, bathroom: false, kitchen: true, TV: false, radio: true,
    refrigerator: true, microwave: false, gas: true, water: true,
    gallery: gallery('1594495894542-a46cc73e081a', A.tent, A.starMtn, A.lake),
    reviews: [
      { reviewer_name: 'Jordan Blake', reviewer_rating: 5, comment: 'Took the Sierra out to Canyonlands for ten days. Handled the washboard roads like a champ and the solar setup meant we never worried about power.' },
      { reviewer_name: 'Megan Alvarez', reviewer_rating: 4, comment: 'Loved the layout. Only wish it had a shower, but for the price and size it was exactly what we needed.' },
    ],
  },
  {
    id: 'ov-02',
    name: 'Redwood Roamer XT',
    price: 279,
    rating: 4.9,
    location: 'Bend, Oregon',
    form: 'fullyIntegrated',
    description:
      'Our flagship expedition rig. A fully-integrated coach with a real bathroom, a full kitchen and enough water and battery to disappear into the Cascades for a fortnight. Polished aluminium skin, vintage soul, modern guts.',
    length: '7.4 m', width: '2.3 m', height: '3.1 m',
    tank: '160 L', consumption: '14 L/100km',
    transmission: 'automatic', engine: 'diesel',
    AC: true, bathroom: true, kitchen: true, TV: true, radio: true,
    refrigerator: true, microwave: true, gas: true, water: true,
    gallery: gallery('1523987355523-c7b5b0dd90a7', A.lake, A.dawn, A.snowMtn),
    reviews: [
      { reviewer_name: 'Chris Donovan', reviewer_rating: 5, comment: 'Absolute palace on wheels. We did the whole Oregon coast and never once felt like we were roughing it. Bathroom is a game-changer.' },
      { reviewer_name: 'Priya Nair', reviewer_rating: 5, comment: 'Immaculate rig, spotless on pickup, and the OVERLAND team walked us through everything. Best trip we have ever taken.' },
    ],
  },
  {
    id: 'ov-03',
    name: 'Canyon Cruiser 19',
    price: 165,
    rating: 4.6,
    location: 'Sedona, Arizona',
    form: 'van',
    description:
      'A stealth desert cruiser with a pop-top and a killer view. Sleeps two up top, two below. Perfect for chasing golden hour across the mesas and cooking dinner under a sky full of stars.',
    length: '5.4 m', width: '2.0 m', height: '2.1 m (roof down)',
    tank: '70 L', consumption: '10.5 L/100km',
    transmission: 'manual', engine: 'petrol',
    AC: true, bathroom: false, kitchen: true, TV: false, radio: true,
    refrigerator: true, microwave: false, gas: true, water: true,
    gallery: gallery('1516939884455-1445c8652f83', A.starMtn, A.fire, A.tent),
    reviews: [
      { reviewer_name: 'Tyler Reese', reviewer_rating: 5, comment: 'The pop-top is unreal for stargazing. Woke up to the sun hitting the red rocks every single morning. Would book again in a heartbeat.' },
      { reviewer_name: 'Hannah Cole', reviewer_rating: 4, comment: 'Great little van. Manual gearbox took a bit of getting used to on the hills but honestly part of the charm.' },
    ],
  },
  {
    id: 'ov-04',
    name: 'Big Sur Breeze',
    price: 199,
    rating: 4.7,
    location: 'Monterey, California',
    form: 'van',
    description:
      'A sun-bleached coastal cruiser made for Highway 1. Pop the top, slide open the door to the ocean, and let the Pacific do the rest. Compact, classic, and endlessly photogenic.',
    length: '5.5 m', width: '2.0 m', height: '2.2 m (roof down)',
    tank: '75 L', consumption: '10.8 L/100km',
    transmission: 'manual', engine: 'petrol',
    AC: false, bathroom: false, kitchen: true, TV: false, radio: true,
    refrigerator: true, microwave: false, gas: true, water: true,
    gallery: gallery('1527786356703-4b100091cd2c', A.lake, A.dawn, A.fire),
    reviews: [
      { reviewer_name: 'Olivia Grant', reviewer_rating: 5, comment: 'Drove Big Sur to Santa Barbara and every pull-off felt like a movie set. This van IS the vibe. Woke up to sea otters one morning.' },
      { reviewer_name: 'Marco Bianchi', reviewer_rating: 4, comment: 'Charming classic. No AC but the coast stays cool. Ran perfectly the whole trip.' },
    ],
  },
  {
    id: 'ov-05',
    name: 'Cascade Wanderer 25',
    price: 245,
    rating: 4.7,
    location: 'Bozeman, Montana',
    form: 'alcove',
    description:
      'A classic alcove motorhome with room for the whole crew. Over-cab bunk, full kitchen, wet bath and a dinette that drops into a second bed. Big Sky country was made for a rig like this.',
    length: '7.0 m', width: '2.3 m', height: '3.0 m',
    tank: '140 L', consumption: '15 L/100km',
    transmission: 'automatic', engine: 'diesel',
    AC: true, bathroom: true, kitchen: true, TV: true, radio: true,
    refrigerator: true, microwave: true, gas: true, water: true,
    gallery: gallery('/rigs/alcove-rv.jpg', A.snowMtn, A.lake, A.starMtn),
    reviews: [
      { reviewer_name: 'Marcus Bell', reviewer_rating: 5, comment: 'Took the family to Yellowstone and Glacier. Slept five comfortably, the kids loved the over-cab bunk, and the heater kept us toasty at altitude.' },
      { reviewer_name: 'Elena Ruiz', reviewer_rating: 4, comment: 'Spacious and well equipped. A bit thirsty on fuel through the mountains but that comes with the size.' },
    ],
  },
  {
    id: 'ov-06',
    name: 'Blue Ridge Voyager',
    price: 219,
    rating: 4.8,
    location: 'Asheville, North Carolina',
    form: 'fullyIntegrated',
    description:
      'A four-season coach dialled in for the Appalachian back roads. Heated tanks, a proper indoor shower and a panoramic rear lounge that turns fall-foliage season into a moving painting.',
    length: '6.8 m', width: '2.2 m', height: '2.9 m',
    tank: '130 L', consumption: '13 L/100km',
    transmission: 'automatic', engine: 'diesel',
    AC: true, bathroom: true, kitchen: true, TV: true, radio: true,
    refrigerator: true, microwave: true, gas: true, water: true,
    gallery: gallery('/rigs/red-van-mountain.jpg', A.dawn, A.fire, A.snowMtn),
    reviews: [
      { reviewer_name: 'Grace Sullivan', reviewer_rating: 5, comment: 'Did the Blue Ridge Parkway in peak leaf season. The rear lounge windows made every mile feel like a postcard. Faultless rig.' },
      { reviewer_name: 'Nathan Brooks', reviewer_rating: 5, comment: 'Warm, dry and comfortable even when it dropped below freezing overnight. The heated tanks are worth every penny.' },
    ],
  },
  {
    id: 'ov-07',
    name: 'Rainier Rambler',
    price: 175,
    rating: 4.6,
    location: 'Packwood, Washington',
    form: 'van',
    description:
      'A rain-ready Pacific Northwest van with a diesel heater and a drying rack that actually works. Chase waterfalls, old-growth forest and volcano views, then dry your boots by the fire inside.',
    length: '5.8 m', width: '2.1 m', height: '2.7 m',
    tank: '85 L', consumption: '11 L/100km',
    transmission: 'automatic', engine: 'diesel',
    AC: true, bathroom: false, kitchen: true, TV: false, radio: true,
    refrigerator: true, microwave: false, gas: true, water: true,
    gallery: gallery('/rigs/blue-van.jpg', A.snowMtn, A.tent, A.lake),
    reviews: [
      { reviewer_name: 'Derek Vance', reviewer_rating: 5, comment: 'Rained four of five days and I did not care one bit. The heater and drying rack turned a soggy trip into the best one all year. Mt Rainier at dawn is unreal.' },
      { reviewer_name: 'Aisha Bello', reviewer_rating: 4, comment: 'Cozy and capable. Handled the forest service roads to the trailheads no problem.' },
    ],
  },
  {
    id: 'ov-08',
    name: 'Sawtooth Scout',
    price: 235,
    rating: 4.9,
    location: 'Stanley, Idaho',
    form: 'alcove',
    description:
      'A rugged alcove built for alpine basecamps. Extra ground clearance, all-terrain tyres and a heated interior for shoulder-season trips into the Sawtooths. Sleeps four, carries all the gear.',
    length: '6.9 m', width: '2.3 m', height: '3.0 m',
    tank: '135 L', consumption: '14.5 L/100km',
    transmission: 'automatic', engine: 'diesel',
    AC: true, bathroom: true, kitchen: true, TV: false, radio: true,
    refrigerator: true, microwave: true, gas: true, water: true,
    gallery: gallery('/rigs/red-van-beach.jpg', A.starMtn, A.snowMtn, A.fire),
    reviews: [
      { reviewer_name: 'Cole Jensen', reviewer_rating: 5, comment: 'Basecamped at Redfish Lake for a week of climbing. The clearance got us down roads other rigs turned back on. Woke up to alpenglow on the Sawtooths every morning.' },
      { reviewer_name: 'Rebecca Lund', reviewer_rating: 5, comment: 'Warm, tough, and surprisingly comfortable. Perfect for a cold-weather trip. Would take it into the mountains again in a heartbeat.' },
    ],
  },
]

export const findCamper = id => campers.find(c => c.id === id)
