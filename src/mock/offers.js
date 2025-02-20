const MOCK_OFFERS_LIST = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 'e4ac9df6-fe5a-40e4-a7f2-f7389e2c445e',
        'title': 'Upgrade to a business class',
        'price': 123
      },
      {
        'id': '60fd0dc8-f396-4a75-92f6-6940a785059d',
        'title': 'Choose the radio station',
        'price': 55
      },
      {
        'id': 'eb272342-702c-4d96-bc21-2f9ff124dad0',
        'title': 'Choose temperature',
        'price': 38
      },
      {
        'id': '51cf52ed-e73b-4b2e-99da-ba7a19e4fe97',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 70
      },
      {
        'id': '8ef71e66-fe4f-41c2-90f0-84e761cacc01',
        'title': 'Drive slowly',
        'price': 175
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'ae99069c-c246-430d-8c90-effad77d4831',
        'title': 'Infotainment system',
        'price': 36
      },
      {
        'id': 'c28c7abe-fbf2-46ec-aec5-e673654289c7',
        'title': 'Order meal',
        'price': 173
      },
      {
        'id': 'b2615390-dfab-4c38-bca9-3116f44d25f7',
        'title': 'Choose seats',
        'price': 67
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
        'title': 'Book a taxi at the arrival point',
        'price': 66
      },
      {
        'id': '659142a4-1ea2-4d02-b31f-082eba1afc8e',
        'title': 'Order a breakfast',
        'price': 174
      },
      {
        'id': 'aea4e17c-0069-4884-9ffa-8bc5f7899075',
        'title': 'Wake up at a certain time',
        'price': 60
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '1b22fb31-acef-4d01-9c62-9ac18b176387',
        'title': 'Choose meal',
        'price': 166
      },
      {
        'id': '02db9a9c-6ea4-471f-9904-c4c969a26e63',
        'title': 'Choose seats',
        'price': 173
      },
      {
        'id': '530f0e32-9f97-492b-aee5-b10dd2d815a5',
        'title': 'Upgrade to comfort class',
        'price': 108
      },
      {
        'id': '3344000b-4079-425a-a188-0f8be957d1c5',
        'title': 'Upgrade to business class',
        'price': 100
      },
      {
        'id': 'fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6',
        'title': 'Add luggage',
        'price': 124
      },
      {
        'id': 'cf67a33c-dbea-4788-833e-e140bfbc03d0',
        'title': 'Business lounge',
        'price': 120
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 'bf55fdef-d2c3-4a39-8a8f-dd6d40f6b954',
        'title': 'Choose the time of check-in',
        'price': 90
      },
      {
        'id': 'cfd32a95-916e-43bb-ac0b-ac92215e7ea8',
        'title': 'Choose the time of check-out',
        'price': 61
      },
      {
        'id': 'dc7e4af4-1371-42fe-9f60-e75e82f96dca',
        'title': 'Add breakfast',
        'price': 195
      },
      {
        'id': 'cf351d11-b6cd-4ce6-86b1-09ba32e6a271',
        'title': 'Laundry',
        'price': 139
      },
      {
        'id': 'a749c843-4981-4d38-892b-076437c24597',
        'title': 'Order a meal from the restaurant',
        'price': 197
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'be02a8b1-e2ba-48f3-82a3-79f690f9638a',
        'title': 'Choose meal',
        'price': 112
      },
      {
        'id': '6f99087f-2b81-4654-9c2b-efe1d4ef615c',
        'title': 'Choose seats',
        'price': 115
      },
      {
        'id': 'cba06821-0983-48e1-a3e0-af055ab42e69',
        'title': 'Upgrade to comfort class',
        'price': 79
      },
      {
        'id': '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
        'title': 'Upgrade to business class',
        'price': 75
      },
      {
        'id': 'a2026208-7504-446b-ae62-f71e89879210',
        'title': 'Add luggage',
        'price': 135
      },
      {
        'id': 'f3a8c33b-3019-4bc8-9881-fdcf296b9027',
        'title': 'Business lounge',
        'price': 165
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 'a37cb8b6-aa11-496e-aac7-e2480b457255',
        'title': 'With automatic transmission',
        'price': 142
      },
      {
        'id': 'c2918495-5349-4436-a729-305f578c2684',
        'title': 'With air conditioning',
        'price': 174
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '24281514-431e-4ace-a858-a5895913ef5b',
        'title': 'Choose live music',
        'price': 177
      },
      {
        'id': '5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8',
        'title': 'Choose VIP area',
        'price': 198
      }
    ]
  }
];

function getMockOffersList () {
  return MOCK_OFFERS_LIST;
}

export {getMockOffersList};
