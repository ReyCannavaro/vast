import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dataRoot = join(root, "src", "data");

const sourceNote =
  "Diringkas dari referensi publik pariwisata, warisan budaya, dan dokumentasi aset lokal; tautan dan lisensi aset tetap dicatat pada dokumentasi submit.";

const source = {
  label: "Riset Data Publik",
  note: sourceNote,
};

function parseDataFile(filename, exportName) {
  const content = readFileSync(join(dataRoot, filename), "utf8");
  const marker = `export const ${exportName}:`;
  const markerIndex = content.indexOf(marker);
  const assignmentIndex = content.indexOf("=", markerIndex);
  const arrayStart = content.indexOf("[", assignmentIndex);
  const arrayEnd = content.lastIndexOf("];");

  return JSON.parse(content.slice(arrayStart, arrayEnd + 1));
}

function writeDataFile(filename, typeName, exportName, items) {
  const content = `import type { ${typeName} } from "@/types/region";\n\nexport const ${exportName}: ${typeName}[] = ${JSON.stringify(
    items,
    null,
    2,
  )};\n`;

  writeFileSync(join(dataRoot, filename), content);
}

function titleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function regionName(slug) {
  const [type, ...nameParts] = slug.split("-");
  return `${type === "kota" ? "Kota" : "Kabupaten"} ${titleCase(nameParts.join("-"))}`;
}

function shortRegionName(slug) {
  return regionName(slug).replace(/^Kabupaten\s+/i, "").replace(/^Kota\s+/i, "");
}

function normalizeSourceFields(item) {
  const next = {
    ...item,
    source,
  };

  if (next.image?.source) {
    next.image = {
      ...next.image,
      source,
    };
  }

  return next;
}

function foodDescription(item) {
  const name = item.name;
  const lower = name.toLowerCase();
  const place = shortRegionName(item.regionSlug);

  if (/rujak soto/.test(lower)) {
    return `${name} memadukan rujak sayur berbumbu petis dengan kuah soto daging; perpaduan ini lekat dengan citarasa Osing Banyuwangi yang gurih, segar, dan berani.`;
  }

  if (/pecel rawon/.test(lower)) {
    return `${name} menggabungkan pecel berbumbu kacang dengan kuah rawon berkluwek, menghasilkan hidangan Banyuwangi yang kontras antara segar, gurih, dan rempah gelap.`;
  }

  if (/rujak cingur/.test(lower)) {
    return `${name} memakai bumbu petis, kacang, sayuran, lontong, tahu, tempe, dan cingur; hidangan ini kuat sebagai penanda kuliner Surabaya.`;
  }

  if (/lontong balap/.test(lower)) {
    return `${name} dikenal dengan lontong, tauge, lentho, tahu, dan kuah gurih; sajian ini menjadi ikon jajanan jalanan Surabaya.`;
  }

  if (/soto lamongan/.test(lower)) {
    return `${name} memakai kuah ayam kuning berempah dan taburan koya, ciri yang membuat soto Lamongan mudah dikenali di banyak kota.`;
  }

  if (/rawon/.test(lower)) {
    return `${name} menonjolkan kuah hitam berbumbu kluwek, rempah, dan daging; karakter gurihnya sangat dekat dengan tradisi kuliner Jawa Timur.`;
  }

  if (/tahu campur/.test(lower)) {
    return `${name} menyajikan tahu, sayur, lentho, dan kuah daging bercita rasa petis; perpaduannya memperlihatkan karakter gurih pesisir Jawa Timur.`;
  }

  if (/tahu takwa|tahu pong|tahu bumbu/.test(lower)) {
    return `${name} menunjukkan kuatnya tradisi olahan tahu di ${place}, biasanya dinikmati dengan sambal, kecap, atau pelengkap gurih.`;
  }

  if (/nasi krawu/.test(lower)) {
    return `${name} berisi nasi, suwiran daging, serundeng, dan sambal; hidangan ini melekat dengan identitas kuliner Gresik.`;
  }

  if (/pecel madiun/.test(lower)) {
    return `${name} memakai sayuran rebus, bumbu kacang, dan peyek; sajian ini menjadi identitas kuliner Madiun yang dikenal luas.`;
  }

  if (/pecel/.test(lower)) {
    return `${name} mengandalkan bumbu kacang, sayuran, dan pelengkap lokal; versi ${place} memberi warna tersendiri pada tradisi pecel Jawa Timur.`;
  }

  if (/sate ponorogo/.test(lower)) {
    return `${name} biasanya memakai irisan ayam memanjang dengan bumbu kacang halus; tekstur dan bumbunya berbeda dari sate Madura.`;
  }

  if (/sate|satay/.test(lower)) {
    return `${name} menyajikan potongan lauk bakar dengan bumbu kacang atau kecap, memperlihatkan gaya kuliner rakyat yang mudah ditemui di ${place}.`;
  }

  if (/bebek/.test(lower)) {
    return `${name} menonjolkan olahan bebek berbumbu kuat, digoreng atau dikukus hingga empuk, lalu disajikan dengan sambal dan nasi hangat.`;
  }

  if (/kaldu kokot/.test(lower)) {
    return `${name} adalah sup kaki sapi khas Madura dengan kuah gurih pekat, kacang hijau, dan rempah yang membuatnya mengenyangkan.`;
  }

  if (/lorjuk|kupang|rajungan|ikan|bandeng|belut/.test(lower)) {
    return `${name} memanfaatkan hasil laut atau perairan lokal, menghadirkan rasa gurih pesisir yang kuat di ${place}.`;
  }

  if (/tape|brem|prol|proll|suwar|madu mongso/.test(lower)) {
    return `${name} berasal dari tradisi fermentasi dan olahan manis tapai, cocok sebagai camilan atau oleh-oleh khas ${place}.`;
  }

  if (/wingko|pudak|jenang|wajik|onde|klepon|lupis|cenil|getuk|jadah|kue|pia|bubur|strundel|bakpao|bipang/.test(lower)) {
    return `${name} adalah jajanan tradisional bernuansa manis atau legit, biasanya hadir sebagai camilan pasar dan oleh-oleh dari ${place}.`;
  }

  if (/keripik|kripik|coklat|salak|apel|buah|mangga|melinjo/.test(lower)) {
    return `${name} mengolah hasil pertanian lokal menjadi camilan ringan, sehingga mudah dibawa sebagai buah tangan dari ${place}.`;
  }

  if (/dawet|es |wedang|sirup|legen|sari/.test(lower)) {
    return `${name} adalah minuman lokal yang mengandalkan kesegaran bahan daerah, cocok untuk melengkapi kuliner ${place}.`;
  }

  if (/soto/.test(lower)) {
    return `${name} memakai kuah berempah dengan lauk dan pelengkap lokal, salah satu bentuk kuliner berkuah yang akrab di ${place}.`;
  }

  if (/nasi|sego/.test(lower)) {
    return `${name} adalah sajian nasi lokal dengan lauk, sambal, atau sayur khas daerah; hidangan ini merekam selera harian masyarakat ${place}.`;
  }

  if (/ayam|mendol|botok|dendeng|garang|pindang|bakso|lontong|punten|ampok|tiwul/.test(lower)) {
    return `${name} memperlihatkan olahan rumahan dan warung tradisional ${place}, dengan bumbu kuat yang dekat dengan selera Jawa Timur.`;
  }

  return `${name} adalah bagian dari kuliner lokal ${place}, dikenal lewat bahan daerah, bumbu rumahan, dan cara penyajian yang dekat dengan keseharian masyarakat setempat.`;
}

function heritageDescription(item) {
  const name = item.name;
  const lower = name.toLowerCase();
  const region = regionName(item.regionSlug);
  const place = shortRegionName(item.regionSlug);

  if (/reog|reyog/.test(lower)) {
    return `${name} adalah seni pertunjukan ikonik Ponorogo dengan dadak merak, warok, jathil, dan iringan gamelan yang menjadi simbol kuat budaya Jawa Timur.`;
  }

  if (/gandrung/.test(lower)) {
    return `${name} merupakan tari penyambutan masyarakat Osing Banyuwangi, identik dengan busana mencolok, gerak lincah, dan iringan musik khas.`;
  }

  if (/seblang/.test(lower)) {
    return `${name} adalah ritual tari masyarakat Osing yang berkaitan dengan bersih desa, doa keselamatan, dan penghormatan pada leluhur.`;
  }

  if (/kebo[-\s]?keboan/.test(lower)) {
    return `${name} adalah ritual agraris Banyuwangi yang menggambarkan kerbau sebagai simbol kesuburan sawah dan harapan panen baik.`;
  }

  if (/karapan|kerapan|sapi sonok/.test(lower)) {
    return `${name} berasal dari tradisi Madura yang menempatkan sapi sebagai bagian dari kebanggaan, ketangkasan, dan perayaan masyarakat.`;
  }

  if (/kasada|karo|tengger/.test(lower)) {
    return `${name} berkaitan dengan tradisi masyarakat Tengger di kawasan Bromo, berisi doa, persembahan, dan penghormatan pada warisan leluhur.`;
  }

  if (/ludruk/.test(lower)) {
    return `${name} adalah teater rakyat Jawa Timur yang memadukan dialog, humor, musik, dan kritik sosial dalam bahasa keseharian masyarakat.`;
  }

  if (/topeng|wayang topeng/.test(lower)) {
    return `${name} menampilkan tradisi topeng dan kisah Panji, dengan karakter, gerak tari, dan musik yang hidup dalam budaya ${place}.`;
  }

  if (/dongkrek/.test(lower)) {
    return `${name} adalah kesenian Madiun yang memakai topeng, bunyi kentongan, dan narasi tolak bala dalam pertunjukan rakyat.`;
  }

  if (/jaran bodhag|glipang|kethek ogleng|ojhung|bantengan/.test(lower)) {
    return `${name} adalah seni pertunjukan rakyat ${region} yang menggabungkan gerak, musik, kostum, dan cerita lokal sebagai tontonan komunal.`;
  }

  if (/batik/.test(lower)) {
    return `${name} memperlihatkan ragam batik ${place}, biasanya mengambil inspirasi dari flora, fauna, sejarah, atau ikon lokal daerah.`;
  }

  if (/candi|situs|makam|petilasan|sejarah|tempo doeloe/.test(lower)) {
    return `${name} menjaga lapisan sejarah ${region}, menjadi pengingat hubungan daerah ini dengan kerajaan, tokoh, atau kawasan lama.`;
  }

  if (/grebeg|kirab|parade|festival|haul|bersih desa|ruwat|nyadran|larung|petik laut|rokat tase|sedekah/.test(lower)) {
    return `${name} adalah tradisi komunal ${region} yang mempertemukan doa, arak-arakan, seni, dan rasa syukur masyarakat.`;
  }

  if (/jaranan|kuda|turonggo/.test(lower)) {
    return `${name} adalah seni kuda kepang yang berkembang di ${place}, memadukan irama, gerak dinamis, dan suasana pertunjukan rakyat.`;
  }

  if (/tari|lengger|tayub/.test(lower)) {
    return `${name} adalah seni tari ${region} yang menampilkan bahasa gerak, kostum, dan irama lokal sebagai identitas panggung daerah.`;
  }

  if (/wayang|kentrung|sandur/.test(lower)) {
    return `${name} adalah tradisi tutur atau pertunjukan rakyat yang membawa cerita, musik, dan pesan moral dalam ruang budaya ${place}.`;
  }

  if (/carok/.test(lower)) {
    return `${name} adalah istilah sosial-budaya Madura terkait konflik kehormatan; dalam konteks edukasi, ia perlu dipahami sebagai sejarah sosial, bukan atraksi.`;
  }

  if (/damar kurung/.test(lower)) {
    return `${name} adalah seni lampion bergambar khas Gresik yang merekam cerita keseharian, religiusitas, dan suasana kampung dalam panel visual.`;
  }

  if (/musik|terbang|hadrah|daul|saronen/.test(lower)) {
    return `${name} memperlihatkan tradisi musik rakyat ${region}, biasanya hadir dalam perayaan, arak-arakan, atau panggung kampung.`;
  }

  if (/ikon|budaya|kampung|desa|upacara|tradisi/.test(lower) || item.category !== "lainnya") {
    return `${name} hidup dalam lanskap budaya ${region}, hadir lewat acara warga, ruang kreatif, atau cerita turun-temurun yang masih dikenali setempat.`;
  }

  return `${name} menjadi penanda cerita lokal ${region}, menghubungkan kebiasaan masyarakat, ingatan tempat, dan warisan yang masih dikenali hingga kini.`;
}

function destinationDescription(item) {
  const name = item.name;
  const lower = name.toLowerCase();
  const region = regionName(item.regionSlug);
  const place = shortRegionName(item.regionSlug);

  if (/kawah ijen/.test(lower)) {
    return `${name} terkenal dengan lanskap kawah belerang dan fenomena api biru, menjadikannya salah satu daya tarik alam paling kuat di ujung timur Jawa.`;
  }

  if (/bromo|semeru|ijen|kawah|gunung|bukit|puncak|ranu|telaga|air terjun|coban|hutan|savana|goa|gua|pantai|pulau|gili|dermaga|mercusuar|pelabuhan/.test(lower)) {
    return `${name} menampilkan lanskap alam ${region}, dari pesisir, perbukitan, hingga ruang terbuka yang sering menjadi tujuan wisata utama ${place}.`;
  }

  if (/candi|situs|museum|makam|petilasan|gereja|kota tua|tugu|monumen|benteng|keraton|pesarean/.test(lower)) {
    return `${name} menyimpan jejak sejarah ${region}, cocok untuk membaca lapisan masa lalu, tokoh, dan perubahan kota dari dekat.`;
  }

  if (/kampung|desa|sentra|batik|kya kya|pecinan|arab|kemiren/.test(lower)) {
    return `${name} memberi pengalaman budaya di ${region}, mempertemukan aktivitas warga, tradisi, kuliner, dan ruang kreatif setempat.`;
  }

  if (/alun|taman|jalan|mall|pasar|waterpark|wisata/.test(lower)) {
    return `${name} menjadi ruang kunjungan populer di ${region}, dekat dengan aktivitas kota, rekreasi keluarga, atau wajah urban ${place}.`;
  }

  if (item.type === "religi") {
    return `${name} adalah destinasi religi di ${region}, dikunjungi untuk ziarah, refleksi, dan mengenal tradisi spiritual masyarakat setempat.`;
  }

  if (item.type === "budaya") {
    return `${name} memperlihatkan sisi budaya ${region}, dari tradisi warga hingga ruang belajar yang memperkenalkan identitas lokal.`;
  }

  return `${name} adalah tujuan kunjungan di ${region}, menghadirkan pengalaman lokal yang melengkapi peta budaya dan perjalanan di Jawa Timur.`;
}

function batikDescription(item) {
  const name = item.name;
  const lower = name.toLowerCase();
  const region = regionName(item.regionSlug);
  const place = shortRegionName(item.regionSlug);

  if (/gentongan/.test(lower)) {
    return `${name} dikenal dari tradisi batik Madura di Bangkalan, dengan warna kuat dan proses pewarnaan yang memberi karakter mendalam pada kain.`;
  }

  if (/gajah\s?oling|gajaholing/.test(lower)) {
    return `${name} mengangkat ikon visual Banyuwangi yang dekat dengan identitas Osing, sering dibaca sebagai simbol kekuatan dan keberuntungan.`;
  }

  if (/jetis/.test(lower)) {
    return `${name} terkait dengan Kampung Batik Jetis Sidoarjo, salah satu pusat batik lokal yang berkembang di kawasan delta.`;
  }

  if (/tuban/.test(lower)) {
    return `${name} dekat dengan tradisi batik pesisir Tuban yang dikenal lewat warna bumi, motif flora-fauna, dan napas budaya pantura.`;
  }

  return `${name} memperkenalkan bahasa visual batik ${region}, mengambil inspirasi dari ikon, alam, sejarah, atau cerita masyarakat ${place}.`;
}

function batikInspiration(item) {
  const motif = item.name.replace(/^Batik\s+/i, "");
  return `${motif} dan identitas lokal ${shortRegionName(item.regionSlug)}`;
}

function shortExplanation(description) {
  if (description.length <= 190) {
    return description;
  }

  const sliced = description.slice(0, 187);
  const sentenceEnd = Math.max(
    sliced.lastIndexOf("."),
    sliced.lastIndexOf(";"),
    sliced.lastIndexOf(","),
  );

  return `${sliced.slice(0, sentenceEnd > 90 ? sentenceEnd : 187).trim()}.`;
}

const foods = parseDataFile("foods.ts", "foods").map((item) =>
  normalizeSourceFields({
    ...item,
    description: foodDescription(item),
  }),
);

const heritageItems = parseDataFile("heritageItems.ts", "heritageItems").map((item) =>
  normalizeSourceFields({
    ...item,
    description: heritageDescription(item),
  }),
);

const destinations = parseDataFile("destinations.ts", "destinations").map((item) =>
  normalizeSourceFields({
    ...item,
    description: destinationDescription(item),
  }),
);

const batikPatterns = parseDataFile("batikPatterns.ts", "batikPatterns").map((item) =>
  normalizeSourceFields({
    ...item,
    description: batikDescription(item),
    inspiration: item.inspiration && item.inspiration !== "Identitas budaya " + regionName(item.regionSlug)
      ? item.inspiration
      : batikInspiration(item),
  }),
);

writeDataFile("foods.ts", "FoodItem", "foods", foods);
writeDataFile("heritageItems.ts", "HeritageItem", "heritageItems", heritageItems);
writeDataFile("destinations.ts", "DestinationItem", "destinations", destinations);
writeDataFile("batikPatterns.ts", "BatikPattern", "batikPatterns", batikPatterns);

const lookup = new Map();

for (const [kind, collection] of [
  ["warisan budaya", heritageItems],
  ["kuliner", foods],
  ["destinasi", destinations],
  ["motif batik", batikPatterns],
]) {
  for (const item of collection) {
    lookup.set(item.id, {
      kind,
      item,
      description: item.description,
    });
    lookup.set(`${item.regionSlug}::${item.name.toLowerCase()}`, {
      kind,
      item,
      description: item.description,
    });
  }
}

const quizQuestions = parseDataFile("quizQuestions.ts", "quizQuestions").map((question) => {
  if (!question.regionSlug) {
    return question;
  }

  const itemId = question.id.replace(/^quiz-(culture|food|destination|batik)-/, "");
  const match = lookup.get(itemId) ?? lookup.get(
    `${question.regionSlug}::${question.correctAnswer.toLowerCase()}`,
  );

  if (!match) {
    return {
      ...question,
      explanation: `${question.correctAnswer} terhubung dengan pengetahuan budaya, kuliner, atau destinasi lokal ${regionName(question.regionSlug)}.`,
    };
  }

  return {
    ...question,
    explanation: `${match.item.name} termasuk ${match.kind} ${regionName(question.regionSlug)}. ${shortExplanation(match.description)}`,
  };
});

writeDataFile("quizQuestions.ts", "QuizQuestion", "quizQuestions", quizQuestions);

const matchingGameItems = parseDataFile(
  "matchingGameItems.ts",
  "matchingGameItems",
).map((item) => {
  const match =
    lookup.get(`${item.regionSlug}::${item.leftLabel.toLowerCase()}`) ??
    lookup.get(`${item.regionSlug}::${item.rightLabel.toLowerCase()}`);

  if (!match) {
    return {
      ...item,
      explanation: `${item.leftLabel} terhubung dengan ${item.rightLabel} dalam peta pengetahuan ${regionName(item.regionSlug)}.`,
    };
  }

  return {
    ...item,
    explanation: `${match.item.name} termasuk ${match.kind} ${regionName(item.regionSlug)}. ${shortExplanation(match.description)}`,
  };
});

const puzzleItems = parseDataFile("puzzleItems.ts", "puzzleItems").map((item) => ({
  ...item,
  image: {
    ...item.image,
    source,
  },
}));

writeDataFile("matchingGameItems.ts", "MatchingGameItem", "matchingGameItems", matchingGameItems);
writeDataFile("puzzleItems.ts", "PuzzleItem", "puzzleItems", puzzleItems);

console.log(
  JSON.stringify(
    {
      updated: {
        foods: foods.length,
        heritageItems: heritageItems.length,
        destinations: destinations.length,
        batikPatterns: batikPatterns.length,
        quizQuestions: quizQuestions.length,
        matchingGameItems: matchingGameItems.length,
        puzzleItems: puzzleItems.length,
      },
    },
    null,
    2,
  ),
);
