import {getRandomArrayElement} from '../utils/common.js';

const mockPointsList = [
  {
    'id': 'edab8ef8-53db-4eda-93aa-fb7bdef3b57a',
    'basePrice': 2511,
    'dateFrom': '2025-03-04T02:17:12.957Z',
    'dateTo': '2025-03-14T11:33:12.957Z',
    'destination': 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    'isFavorite': true,
    'offers': [
      'cba06821-0983-48e1-a3e0-af055ab42e69',
      '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
      'a2026208-7504-446b-ae62-f71e89879210',
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    'type': 'ship'
  },
  {
    'id': '9a1c902c-cbb5-4993-82cc-4e125331b007',
    'basePrice': 8626,
    'dateFrom': '2025-03-02T22:40:12.957Z',
    'dateTo': '2025-03-20T19:35:12.957Z',
    'destination': 'c068f6d3-e08c-4817-98a2-5b8cbd13df72',
    'isFavorite': true,
    'offers': [
      'cfd32a95-916e-43bb-ac0b-ac92215e7ea8',
      'dc7e4af4-1371-42fe-9f60-e75e82f96dca',
      'cf351d11-b6cd-4ce6-86b1-09ba32e6a271',
      'a749c843-4981-4d38-892b-076437c24597'
    ],
    'type': 'check-in'
  },
  {
    'id': '5ce01478-639b-422e-8760-daea032ba0e1',
    'basePrice': 6698,
    'dateFrom': '2025-03-01T05:06:12.957Z',
    'dateTo': '2025-03-30T21:37:12.957Z',
    'destination': '4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa',
    'isFavorite': false,
    'offers': [
      '1b22fb31-acef-4d01-9c62-9ac18b176387',
      '02db9a9c-6ea4-471f-9904-c4c969a26e63',
      '530f0e32-9f97-492b-aee5-b10dd2d815a5',
      '3344000b-4079-425a-a188-0f8be957d1c5',
      'fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6',
      'cf67a33c-dbea-4788-833e-e140bfbc03d0'
    ],
    'type': 'flight'
  },
  {
    'id': '559680db-15b7-47cb-8ce9-f53c48f4d81b',
    'basePrice': 9261,
    'dateFrom': '2025-03-04T19:52:12.957Z',
    'dateTo': '2025-03-25T11:48:12.957Z',
    'destination': 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    'isFavorite': false,
    'offers': [
      'c28c7abe-fbf2-46ec-aec5-e673654289c7',
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    'type': 'bus'
  },
  {
    'id': '69ce3694-4b5b-4207-afa1-93f01f317c9a',
    'basePrice': 4557,
    'dateFrom': '2025-03-01T19:36:12.957Z',
    'dateTo': '2025-03-31T08:27:12.957Z',
    'destination': '3113e602-f294-4341-a775-d43045a3add9',
    'isFavorite': false,
    'offers': [
      '3344000b-4079-425a-a188-0f8be957d1c5',
      'fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6',
      'cf67a33c-dbea-4788-833e-e140bfbc03d0'
    ],
    'type': 'flight'
  },
  {
    'id': '7b26b27c-a66e-48c6-8cbb-1340d5a3af1a',
    'basePrice': 1451,
    'dateFrom': '2025-03-02T11:51:12.957Z',
    'dateTo': '2025-03-25T13:04:12.957Z',
    'destination': '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    'isFavorite': true,
    'offers': [
      '5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8'
    ],
    'type': 'restaurant'
  },
  {
    'id': '97242b5d-ae67-40c8-88a3-4fa917c47d12',
    'basePrice': 5312,
    'dateFrom': '2025-03-01T19:52:12.957Z',
    'dateTo': '2025-03-28T20:12:12.957Z',
    'destination': '95a5a841-a2d5-48bd-83e1-ca44ac9869ea',
    'isFavorite': false,
    'offers': [
      'a749c843-4981-4d38-892b-076437c24597'
    ],
    'type': 'check-in'
  },
  {
    'id': '2142ab28-43a0-4cee-8bd9-cb04c05b8ae8',
    'basePrice': 9374,
    'dateFrom': '2025-03-05T15:53:12.957Z',
    'dateTo': '2025-03-23T13:07:12.957Z',
    'destination': 'a734ae85-9fce-4e1a-af06-ee28e9c10dd2',
    'isFavorite': true,
    'offers': [
      '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
      'a2026208-7504-446b-ae62-f71e89879210',
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    'type': 'ship'
  },
  {
    'id': '02cce106-1f05-4f6d-9a71-09720000993c',
    'basePrice': 9467,
    'dateFrom': '2025-02-28T10:42:12.957Z',
    'dateTo': '2025-02-28T18:00:12.957Z',
    'destination': 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    'isFavorite': true,
    'offers': [
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    'type': 'ship'
  },
  {
    'id': '7a282fae-e2a8-43bd-a2ed-5ff7c25c5fab',
    'basePrice': 6018,
    'dateFrom': '2025-03-01T06:23:12.957Z',
    'dateTo': '2025-03-01T17:12:12.957Z',
    'destination': 'a734ae85-9fce-4e1a-af06-ee28e9c10dd2',
    'isFavorite': true,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': 'ce5a33a2-1dcb-4972-9657-db6a5e1753c1',
    'basePrice': 7902,
    'dateFrom': '2025-03-03T05:25:12.957Z',
    'dateTo': '2025-03-03T12:50:12.957Z',
    'destination': '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    'isFavorite': true,
    'offers': [
      'eb272342-702c-4d96-bc21-2f9ff124dad0',
      '51cf52ed-e73b-4b2e-99da-ba7a19e4fe97',
      '8ef71e66-fe4f-41c2-90f0-84e761cacc01'
    ],
    'type': 'taxi'
  },
  {
    'id': '376c1186-2e35-439b-9a34-95696b2fc8e2',
    'basePrice': 1721,
    'dateFrom': '2025-03-05T13:09:12.957Z',
    'dateTo': '2025-03-07T01:28:12.957Z',
    'destination': 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    'isFavorite': true,
    'offers': [
      '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
      '659142a4-1ea2-4d02-b31f-082eba1afc8e',
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    'type': 'train'
  },
  {
    'id': '991ddabc-e073-4150-ae81-295741976503',
    'basePrice': 7280,
    'dateFrom': '2025-03-07T14:43:12.957Z',
    'dateTo': '2025-03-08T01:34:12.957Z',
    'destination': '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    'isFavorite': true,
    'offers': [
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    'type': 'train'
  },
  {
    'id': '514f7477-d22e-4961-a94e-b74deec7394a',
    'basePrice': 2707,
    'dateFrom': '2025-03-08T11:55:12.957Z',
    'dateTo': '2025-03-09T00:27:12.957Z',
    'destination': '3202b202-7d98-4b23-9100-bf18c0615947',
    'isFavorite': false,
    'offers': [
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    'type': 'bus'
  },
  {
    'id': '0f3f1a55-b2a9-4844-aa0a-9e7f39ca7b31',
    'basePrice': 2198,
    'dateFrom': '2025-03-10T18:59:12.957Z',
    'dateTo': '2025-03-12T13:10:12.957Z',
    'destination': '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    'isFavorite': false,
    'offers': [
      'cfd32a95-916e-43bb-ac0b-ac92215e7ea8',
      'dc7e4af4-1371-42fe-9f60-e75e82f96dca',
      'cf351d11-b6cd-4ce6-86b1-09ba32e6a271',
      'a749c843-4981-4d38-892b-076437c24597'
    ],
    'type': 'check-in'
  },
  {
    'id': '2976507e-6bd5-43dd-8560-35e395a7ad91',
    'basePrice': 6519,
    'dateFrom': '2025-03-13T19:40:12.957Z',
    'dateTo': '2025-03-15T01:29:12.957Z',
    'destination': '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    'isFavorite': true,
    'offers': [
      '5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'c2a0a150-7f94-4489-96fb-e114300b6e51',
    'basePrice': 2520,
    'dateFrom': '2025-03-16T11:39:12.957Z',
    'dateTo': '2025-03-17T08:46:12.957Z',
    'destination': '3202b202-7d98-4b23-9100-bf18c0615947',
    'isFavorite': true,
    'offers': [
      '8ef71e66-fe4f-41c2-90f0-84e761cacc01'
    ],
    'type': 'taxi'
  },
  {
    'id': 'a25b92c6-8686-439b-a7d2-836c483d39cf',
    'basePrice': 3545,
    'dateFrom': '2025-03-17T16:28:12.957Z',
    'dateTo': '2025-03-18T00:29:12.957Z',
    'destination': '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    'isFavorite': false,
    'offers': [],
    'type': 'train'
  },
  {
    'id': '4d4acb18-df60-4b6e-bbad-2806ed07dd3f',
    'basePrice': 5092,
    'dateFrom': '2025-03-18T12:26:12.957Z',
    'dateTo': '2025-03-19T13:25:12.957Z',
    'destination': '3113e602-f294-4341-a775-d43045a3add9',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'a94ef3e0-ec5d-42db-a660-00f212792f44',
    'basePrice': 7269,
    'dateFrom': '2025-03-20T17:45:12.957Z',
    'dateTo': '2025-03-21T07:33:12.957Z',
    'destination': '95a5a841-a2d5-48bd-83e1-ca44ac9869ea',
    'isFavorite': true,
    'offers': [
      'ae99069c-c246-430d-8c90-effad77d4831',
      'c28c7abe-fbf2-46ec-aec5-e673654289c7',
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    'type': 'bus'
  },
  {
    'id': '69cd269f-54b7-4113-b6e5-49fba103d341',
    'basePrice': 1839,
    'dateFrom': '2025-03-23T01:52:12.957Z',
    'dateTo': '2025-03-24T04:30:12.957Z',
    'destination': '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    'isFavorite': false,
    'offers': [
      '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
      '659142a4-1ea2-4d02-b31f-082eba1afc8e',
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    'type': 'train'
  },
  {
    'id': '46e5cf22-7afd-4c3e-bb4b-2fd8a7f61ff8',
    'basePrice': 6244,
    'dateFrom': '2025-03-26T01:07:12.957Z',
    'dateTo': '2025-03-27T08:06:12.957Z',
    'destination': '4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa',
    'isFavorite': false,
    'offers': [
      '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
      '659142a4-1ea2-4d02-b31f-082eba1afc8e',
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    'type': 'train'
  },
  {
    'id': '2f1e4461-fb52-48c9-a781-acb42e2a3248',
    'basePrice': 8480,
    'dateFrom': '2025-03-28T00:15:12.957Z',
    'dateTo': '2025-03-28T08:02:12.957Z',
    'destination': 'c068f6d3-e08c-4817-98a2-5b8cbd13df72',
    'isFavorite': false,
    'offers': [
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    'type': 'bus'
  },
  {
    'id': 'b21a3bb1-8bda-44b8-b714-b51d647ba980',
    'basePrice': 5055,
    'dateFrom': '2025-03-29T18:19:12.957Z',
    'dateTo': '2025-03-30T20:47:12.957Z',
    'destination': '3202b202-7d98-4b23-9100-bf18c0615947',
    'isFavorite': false,
    'offers': [
      'a37cb8b6-aa11-496e-aac7-e2480b457255',
      'c2918495-5349-4436-a729-305f578c2684'
    ],
    'type': 'drive'
  },
  {
    'id': 'e225f49c-c40d-4ddf-9a64-e8c1cb3f9d8c',
    'basePrice': 1435,
    'dateFrom': '2025-04-01T01:22:12.957Z',
    'dateTo': '2025-04-02T22:52:12.957Z',
    'destination': '3113e602-f294-4341-a775-d43045a3add9',
    'isFavorite': false,
    'offers': [
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    'type': 'train'
  }
];

// const emptyPointsList = [ //массив с пустыми точками для теста
//   {
//     'id': '007',
//     'basePrice': 0,
//     'dateFrom': '',
//     'dateTo': '',
//     'destination': '',
//     'isFavorite': false,
//     'offers': [],
//     'type': 'taxi'
//   },
//   {
//     'id': '008',
//     'basePrice': 0,
//     'dateFrom': '',
//     'dateTo': '',
//     'destination': '',
//     'isFavorite': false,
//     'offers': [],
//     'type': 'taxi'
//   },
//   {
//     'id': '009',
//     'basePrice': 0,
//     'dateFrom': '',
//     'dateTo': '',
//     'destination': '',
//     'isFavorite': false,
//     'offers': [],
//     'type': 'taxi'
//   },
//   {
//     'id': '010',
//     'basePrice': 0,
//     'dateFrom': '',
//     'dateTo': '',
//     'destination': '',
//     'isFavorite': false,
//     'offers': [],
//     'type': 'taxi'
//   },
//   {
//     'id': '011',
//     'basePrice': 0,
//     'dateFrom': '',
//     'dateTo': '',
//     'destination': '',
//     'isFavorite': false,
//     'offers': [],
//     'type': 'taxi'
//   },
//   {
//     'id': '012',
//     'basePrice': 0,
//     'dateFrom': '',
//     'dateTo': '',
//     'destination': '',
//     'isFavorite': false,
//     'offers': [],
//     'type': 'taxi'
//   },
// ];

function getRandomPoint() {
  return getRandomArrayElement(mockPointsList);
}

export {getRandomPoint};
