import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { DeckSearchResponse } from "./type";

export const apiApp = new Hono();

const deckApp = new Hono();

const deckRoute = deckApp.get(
  "/search",
  zValidator(
    "query",
    z.object({
      code: z.string(),
    })
  ),
  (c) => {
    const response: DeckSearchResponse = {
      result: "OK",
      code: "testCode",
      cards: [
        {
          uuid: "D38F0902-41FA-4F01-8C49-99CD05E58B60",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV5K/045199_P_TAKERURAIKOEX.jpg",
        },
        {
          uuid: "5CA2B9C1-1795-42F2-BA5E-A8935F3865E8",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV5K/045199_P_TAKERURAIKOEX.jpg",
        },
        {
          uuid: "662BB472-AE59-4057-BA9F-3DDB7E467483",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV5K/045199_P_TAKERURAIKOEX.jpg",
        },
        {
          uuid: "1622820D-3AC1-4BCA-9222-45146B7C1D74",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV5K/045199_P_TAKERURAIKOEX.jpg",
        },
        {
          uuid: "9FA3D220-463A-4A28-A91D-A0A0C2E60682",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045707_P_OGAPONMIDORINOMENEX.jpg",
        },
        {
          uuid: "DB7E9523-1F98-4135-9F55-FB3E834A3D67",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045707_P_OGAPONMIDORINOMENEX.jpg",
        },
        {
          uuid: "0EFB9211-FB92-4D35-B6C1-9932EE3BFD15",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045707_P_OGAPONMIDORINOMENEX.jpg",
        },
        {
          uuid: "CD52FFE4-503C-4872-B982-3EA412AC7A6E",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045707_P_OGAPONMIDORINOMENEX.jpg",
        },
        {
          uuid: "590B9D2F-AE55-4323-881B-CD8245667A91",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV2P/043272_P_IKIRINKOEX.jpg",
        },
        {
          uuid: "B8C992C7-D6B9-4483-B4EC-E2C02CA1F125",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/S9a/041212_P_KAGAYAKUGEKKOUGA.jpg",
        },
        {
          uuid: "365F2331-F869-418F-84D3-FE7CA849FF39",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4a/044682_T_NESUTOBORU.jpg",
        },
        {
          uuid: "53101999-605B-441E-BB16-57F734BC66CB",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4a/044682_T_NESUTOBORU.jpg",
        },
        {
          uuid: "F7B7F544-5C4D-4642-B0B0-F6FBA7870EB4",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4a/044682_T_NESUTOBORU.jpg",
        },
        {
          uuid: "584FFDA3-8D3A-4CBB-8D07-26709EB27588",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4a/044682_T_NESUTOBORU.jpg",
        },
        {
          uuid: "895D279F-63FF-46C8-A81D-ED1642D25299",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVEL/044196_T_HAIPABORU.jpg",
        },
        {
          uuid: "6CA794C4-1604-4BA7-9F49-A675943BA554",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVEL/044196_T_HAIPABORU.jpg",
        },
        {
          uuid: "E725FAAC-AB4B-4326-BDD6-CB33F2D59384",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045785_T_MUSHITORISETTO.jpg",
        },
        {
          uuid: "38EF8E35-0166-4F2B-A3F7-9E680A9D1FDD",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045785_T_MUSHITORISETTO.jpg",
        },
        {
          uuid: "58BDADDA-2F5D-4F5A-819D-E7162DA64441",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045785_T_MUSHITORISETTO.jpg",
        },
        {
          uuid: "DA57BDA5-AB2D-4BFE-8CF2-E42CB9D12EF6",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/S10D/041421_T_IREKAEKATO.jpg",
        },
        {
          uuid: "470E3133-42FA-4D4C-9C5C-CB81F3C678C9",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/S10D/041421_T_IREKAEKATO.jpg",
        },
        {
          uuid: "1693F84F-F4B1-44BE-B39F-522FF18E1680",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044306_T_DAICHINOUTSUWA.jpg",
        },
        {
          uuid: "9A408B68-F7E9-4538-ABEE-17D31DE51AE0",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044306_T_DAICHINOUTSUWA.jpg",
        },
        {
          uuid: "7CCB6280-DE70-483F-B0DE-9AFAC103F9B9",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044306_T_DAICHINOUTSUWA.jpg",
        },
        {
          uuid: "A5103B85-4E9D-4F3C-B467-26D694550C22",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044306_T_DAICHINOUTSUWA.jpg",
        },
        {
          uuid: "6D7EC720-4ABB-405D-882B-E833536619A5",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVEL/044198_T_POKEGIA30.jpg",
        },
        {
          uuid: "A9439DB5-677A-4560-A9C9-52F62917F5D5",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVEL/044198_T_POKEGIA30.jpg",
        },
        {
          uuid: "8F33BBB4-3F88-41E5-9D52-F28596F7BB59",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVEL/044198_T_POKEGIA30.jpg",
        },
        {
          uuid: "5D23D6E0-98AF-49BA-93BF-CA907C5C2E64",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVD/043812_T_ENERUGIKAISHIXYUU.jpg",
        },
        {
          uuid: "961A4B21-98C4-414B-8906-87869BA311F6",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVD/043812_T_ENERUGIKAISHIXYUU.jpg",
        },
        {
          uuid: "9BC5D23C-5F4E-445F-91D6-BB3958490580",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVD/043812_T_ENERUGIKAISHIXYUU.jpg",
        },
        {
          uuid: "87CA657A-EC06-4D42-91F3-D1FFAC12A2B0",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV1S/042615_T_TOMODACHITECHIXYOU.jpg",
        },
        {
          uuid: "C3A21391-E652-4143-96AA-8A6D3A0D49FB",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045783_T_SHIKURETTOBOKKUSU.jpg",
        },
        {
          uuid: "AEEADBE5-0F50-4F38-ABBA-021C4DA31CEA",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVHM/045378_T_YUUKINOOMAMORI.jpg",
        },
        {
          uuid: "B4F67BE3-259C-4F74-927A-9F8D5696145C",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVHM/045378_T_YUUKINOOMAMORI.jpg",
        },
        {
          uuid: "E40BFC71-1E72-4FC7-8AF3-16E2A83A66F9",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVHM/045378_T_YUUKINOOMAMORI.jpg",
        },
        {
          uuid: "4C13DB1E-2E10-4787-82A0-39CF226CBC4B",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044310_T_ORIMUHAKASENOKIHAKU.jpg",
        },
        {
          uuid: "C30F7EFB-BAED-42B0-A7AD-AF8D25AC66F3",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044310_T_ORIMUHAKASENOKIHAKU.jpg",
        },
        {
          uuid: "BC8B3ED4-5B61-4ECF-BC4B-6F9FE32734C8",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044310_T_ORIMUHAKASENOKIHAKU.jpg",
        },
        {
          uuid: "C4E45C24-EF97-4B4B-B167-F42557444043",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV4K/044310_T_ORIMUHAKASENOKIHAKU.jpg",
        },
        {
          uuid: "5F1DEBA4-BA39-4B34-AF62-E08D64B837EF",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVF/044063_T_NANJIXYAMO.jpg",
        },
        {
          uuid: "F78EF15A-654B-45CF-B98E-6723ECB89185",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVF/044063_T_NANJIXYAMO.jpg",
        },
        {
          uuid: "F471C990-9F55-4BF2-9481-EA19F73F08AC",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVG/044517_T_BOSUNOSHIREI.jpg",
        },
        {
          uuid: "89FFE5B2-97A1-4085-BE97-3E1B17C4508B",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SVG/044517_T_BOSUNOSHIREI.jpg",
        },
        {
          uuid: "B4D5162B-3A08-4764-9DE6-FC931C343555",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/S10b/041752_T_POKESUTOPPU.jpg",
        },
        {
          uuid: "2BDF1B26-BE54-4DB0-83D3-38EB3FA6FF1F",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/S10b/041752_T_POKESUTOPPU.jpg",
        },
        {
          uuid: "9E25085A-51F0-4D67-BD13-60CE240030F4",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042782_E_KIHONKAMINARIENERUGI.jpg",
        },
        {
          uuid: "D8DB1C53-CC0B-4354-B287-CE7543A101EA",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042782_E_KIHONKAMINARIENERUGI.jpg",
        },
        {
          uuid: "77A85A78-7D2B-42B6-A8AA-2FDCCE497BCE",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042782_E_KIHONKAMINARIENERUGI.jpg",
        },
        {
          uuid: "C4A2928D-AC6A-4483-9647-3195DED4D326",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042784_E_KIHONTOUENERUGI.jpg",
        },
        {
          uuid: "EDC4353D-4FE8-4D14-903E-D8D748E064F3",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042784_E_KIHONTOUENERUGI.jpg",
        },
        {
          uuid: "FCF007AB-2000-4878-B670-0A0B186D2814",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042784_E_KIHONTOUENERUGI.jpg",
        },
        {
          uuid: "CAA52C00-6487-4959-B978-540E1AEF275F",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "A2C85C60-5AF9-420F-9C2E-2C443BE9F78B",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "D1E3CE9E-4BE1-485B-9EFB-E188CB7486B6",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "1101217A-D16B-4361-8115-F891F6DD5E1E",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "C59DC97D-23A6-48FD-83F1-AC055DBDDD39",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "C2C0467F-6308-4628-A8AE-6D41F0DC6890",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "393F57DD-BB1B-40A6-AE7D-EBE58667D4F1",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
        {
          uuid: "DFA56259-56A3-4944-BF9E-63F987901759",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/ENE/042779_E_KIHONKUSAENERUGI.jpg",
        },
      ],
    };
    return c.jsonT(response);
  }
);

const apiRoute = apiApp.route("/deck", deckRoute);

export type ApiRoute = typeof apiRoute;
