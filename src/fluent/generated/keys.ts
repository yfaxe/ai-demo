import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'archivex-service-ci': {
                        table: 'cmdb_ci'
                        id: '895fe4be6fe3466eae7da8720e8aae31'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'fd396d26bb32451688768817067444ff'
                    }
                    chg0030045: {
                        table: 'change_request'
                        id: '28bd1acf7c474eedbcaa055a3a3e4b25'
                    }
                    'docflow-db-01': {
                        table: 'cmdb_ci'
                        id: 'f79c6f4fd54f4001923bf5a9e4530a42'
                    }
                    'docflow-depends-on-archivex': {
                        table: 'cmdb_rel_ci'
                        id: 'b856030f71b74a48a1dfa3c5ae915f82'
                    }
                    'docflow-depends-on-db': {
                        table: 'cmdb_rel_ci'
                        id: '2f7a422c11de4698ab8cad95d15bb5b9'
                    }
                    'docflow-depends-on-middleware': {
                        table: 'cmdb_rel_ci'
                        id: '4776bc78602e42558a9e9acb49b867a8'
                    }
                    'docflow-middleware-01': {
                        table: 'cmdb_ci'
                        id: '1f234ea9f0e44d62a726d0d16cfaae14'
                    }
                    'docflow-production-ci': {
                        table: 'cmdb_ci'
                        id: '9365109afc144d2a86fc7a78dee49630'
                    }
                    inc0009990: {
                        table: 'incident'
                        id: '210e9839c5ce406b9f45eeed49af02ab'
                        deleted: true
                    }
                    'inc0009990-journal-1': {
                        table: 'sys_journal_field'
                        id: 'f54ec0b2bc3944929694b6b70172bc2a'
                        deleted: true
                    }
                    'inc0009990-journal-2': {
                        table: 'sys_journal_field'
                        id: '12170c4040cd422da16fc6dae8f283d9'
                        deleted: true
                    }
                    'inc0009990-journal-3': {
                        table: 'sys_journal_field'
                        id: '655674a8ad194a7082971b0c06f5b0e5'
                        deleted: true
                    }
                    'inc0009990-journal-4': {
                        table: 'sys_journal_field'
                        id: '6187ccdb67fe4d4b8a541bc7a743caeb'
                        deleted: true
                    }
                    inc0009991: {
                        table: 'incident'
                        id: '51a79f4875784f10be98eead4e442032'
                        deleted: true
                    }
                    'inc0009991-journal-1': {
                        table: 'sys_journal_field'
                        id: '7f082b6f267a422b9ddf7de189a5e967'
                        deleted: true
                    }
                    'inc0009991-journal-2': {
                        table: 'sys_journal_field'
                        id: '0055d48e18ba4a37a4d2b0040e8b8944'
                        deleted: true
                    }
                    'inc0009991-journal-3': {
                        table: 'sys_journal_field'
                        id: 'f75bdb2480014883b3f1e636921ea90d'
                        deleted: true
                    }
                    'inc0009991-journal-4': {
                        table: 'sys_journal_field'
                        id: 'b9c04f1692474ca0bfa25b982483c213'
                        deleted: true
                    }
                    inc0010001: {
                        table: 'incident'
                        id: '2f9a4ecb5daa490c9d682e1a767262ba'
                    }
                    'inc0010001-journal-1': {
                        table: 'sys_journal_field'
                        id: '40133a8c140e4808ad0034634f29339b'
                    }
                    'inc0010001-journal-2': {
                        table: 'sys_journal_field'
                        id: '85a3a4ecdac74b2ab7d5d735c0cda3e7'
                    }
                    'inc0010001-journal-3': {
                        table: 'sys_journal_field'
                        id: 'bd7ec9bbb9f343fca816b8f8c1d56179'
                    }
                    'inc0010001-journal-4': {
                        table: 'sys_journal_field'
                        id: 'f9774762f34842d6a30224f5772fefc4'
                    }
                    'inc0010001-journal-5': {
                        table: 'sys_journal_field'
                        id: '3cd8c7ea584b4d8da9d1b3fbbf71a8dc'
                    }
                    'inc0010001-journal-6': {
                        table: 'sys_journal_field'
                        id: '60749e45e92d4a388126673798255931'
                    }
                    inc0010002: {
                        table: 'incident'
                        id: '83d0242e6a0449faa299ffe8ff8d89ed'
                        deleted: true
                    }
                    'inc0010002-journal-1': {
                        table: 'sys_journal_field'
                        id: 'f4eb52e3bda94f768c6cb3f7b4a621dc'
                        deleted: true
                    }
                    'inc0010002-journal-10': {
                        table: 'sys_journal_field'
                        id: '55511651eb1c4783bf43bc8c3ed97271'
                        deleted: true
                    }
                    'inc0010002-journal-2': {
                        table: 'sys_journal_field'
                        id: '7c24a7da9ff44a9eb75a6df4de7df77e'
                        deleted: true
                    }
                    'inc0010002-journal-3': {
                        table: 'sys_journal_field'
                        id: 'd7af86c8fbdc4f308b60a1e8c82fa6c3'
                        deleted: true
                    }
                    'inc0010002-journal-4': {
                        table: 'sys_journal_field'
                        id: '6d04fe9f441048819d9f661fa6241ec7'
                        deleted: true
                    }
                    'inc0010002-journal-5': {
                        table: 'sys_journal_field'
                        id: 'd23f4c9e73a54f7d97104cc97ac2a83c'
                        deleted: true
                    }
                    'inc0010002-journal-6': {
                        table: 'sys_journal_field'
                        id: '0a08467590934d388dd70e9fa6c14c27'
                        deleted: true
                    }
                    'inc0010002-journal-7': {
                        table: 'sys_journal_field'
                        id: '36ab6f42129e497886206174a34806e0'
                        deleted: true
                    }
                    'inc0010002-journal-8': {
                        table: 'sys_journal_field'
                        id: '4b88e549be674d6a9c9a9ff20d3b36e7'
                        deleted: true
                    }
                    'inc0010002-journal-9': {
                        table: 'sys_journal_field'
                        id: 'f78ac6337bea4148b130dbf12fdb1b2f'
                        deleted: true
                    }
                    inc0010003: {
                        table: 'incident'
                        id: '333bdcaeb9ef4be7be2fd775c7d3e385'
                    }
                    'inc0010003-journal-1': {
                        table: 'sys_journal_field'
                        id: '635978736cba4d078a2c9f78fe113a7f'
                    }
                    'inc0010003-journal-2': {
                        table: 'sys_journal_field'
                        id: 'aae6883cc77c42cdac24e8f7399e5887'
                        deleted: true
                    }
                    'inc0010003-journal-3': {
                        table: 'sys_journal_field'
                        id: 'f153072f0032413cadb9145b045bf559'
                        deleted: true
                    }
                    inc0010004: {
                        table: 'incident'
                        id: 'dabf4b85dbfe416086250bacca4eedbd'
                    }
                    'inc0010004-journal-1': {
                        table: 'sys_journal_field'
                        id: '71cefc9efb704cd9b009dec27e50aec0'
                    }
                    'inc0010004-journal-2': {
                        table: 'sys_journal_field'
                        id: 'c85f1227e0ea4932a67a3395de013f2e'
                        deleted: true
                    }
                    'inc0010004-journal-3': {
                        table: 'sys_journal_field'
                        id: '9005aa1f079e46b9a7848902ad2a8b33'
                        deleted: true
                    }
                    'inc0010004-journal-4': {
                        table: 'sys_journal_field'
                        id: '10317ea9896b457d9d2550136747ccc5'
                        deleted: true
                    }
                    'inc0010004-journal-5': {
                        table: 'sys_journal_field'
                        id: '18f3d51485c44ceb8433f065c9c7750a'
                        deleted: true
                    }
                    inc0010010: {
                        table: 'incident'
                        id: '673fdaca87e345389ed900da0a62817d'
                    }
                    'inc0010010-journal-1': {
                        table: 'sys_journal_field'
                        id: 'dbf440c518a44cf5a85a196a9b5a2d3b'
                    }
                    inc0010011: {
                        table: 'incident'
                        id: '25a6974a8a814bf9afa77ac10acda351'
                    }
                    'inc0010011-journal-1': {
                        table: 'sys_journal_field'
                        id: 'f60e17f016814b02ab5ce47c2fd50228'
                    }
                    inc0010012: {
                        table: 'incident'
                        id: '48b9bc1eba174e008b4f415c2dbe27a0'
                    }
                    'inc0010012-journal-1': {
                        table: 'sys_journal_field'
                        id: 'e963e927a38a4414bfa7994ca1788464'
                    }
                    inc0010013: {
                        table: 'incident'
                        id: '725fdeb3324a4a28907c1760f85dcebf'
                    }
                    'inc0010013-journal-1': {
                        table: 'sys_journal_field'
                        id: '774ee3acc2384c7a8e5ec6b0039e7614'
                    }
                    inc0010014: {
                        table: 'incident'
                        id: '24ac888316bd44dfa15bcdb0bff3a999'
                    }
                    'inc0010014-journal-1': {
                        table: 'sys_journal_field'
                        id: '0e0023262ccb462b9cd25cea8a5af7e4'
                    }
                    inc0010015: {
                        table: 'incident'
                        id: 'b37e86f2f1bd4f46993efc4e5b007115'
                    }
                    'inc0010015-journal-1': {
                        table: 'sys_journal_field'
                        id: '9ec3be72c6164d8498de9122277d5851'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '9dd3c73a7a5844e1aa1006f715270fc9'
                    }
                    'persona-camille-roux': {
                        table: 'sys_user'
                        id: '4258ad0e9d524935ab1848021975b1b1'
                    }
                    'persona-chloe-dubois': {
                        table: 'sys_user'
                        id: 'ce07ff9d852948739c15e067fff84d23'
                    }
                    'persona-hugo-mercier': {
                        table: 'sys_user'
                        id: '1702a55879b14adf8c69ecbf2cc683a2'
                    }
                    'persona-ines-lefevre': {
                        table: 'sys_user'
                        id: '511417e55d274abbab731dc553e68d94'
                    }
                    'persona-karim-haddad': {
                        table: 'sys_user'
                        id: '3ad3ada44eb74e5aac65c6e287d98c7d'
                    }
                    'persona-lea-garnier': {
                        table: 'sys_user'
                        id: 'c8350d68fec64212a25b7e752fb82364'
                    }
                    'persona-lucas-girard': {
                        table: 'sys_user'
                        id: 'e97a688df1744c75b61124265c235f88'
                    }
                    'persona-mathis-fontaine': {
                        table: 'sys_user'
                        id: '680026229b5042098a31167f23ad603a'
                    }
                    'persona-nathan-lopez': {
                        table: 'sys_user'
                        id: '049d09915a2e41548b969e227445a21f'
                    }
                    'persona-sofia-marchetti': {
                        table: 'sys_user'
                        id: 'f37b662c4bcd488aabb85cb49890a40a'
                    }
                    'persona-theo-bernard': {
                        table: 'sys_user'
                        id: '76e92ff63a72484199a138767698ee24'
                    }
                }
            }
        }
    }
}
