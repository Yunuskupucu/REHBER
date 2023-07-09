const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const adres = document.getElementById('adres');
const kisiListesi = document.querySelector('tbody');
const form = document.getElementById('form');
const tumElemanlar = [];

let satir = undefined;

form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kisiIslemleriniYap);

function kaydet(e) {
  e.preventDefault();
  const eklenecekKisi = {
    ad: ad.value,
    soyad: soyad.value,
    tel: tel.value,
    email: email.value,
    adres: adres.value,
  };

  const sonuc = verileriKontrolEt(eklenecekKisi);
  if (sonuc.durum) {
    if (satir) {
      rehberdeGuncelle(eklenecekKisi);
    } else {
      kisiyiekle(eklenecekKisi);
    }
  } else {
    bilgiOlustur(sonuc.mesaj, sonuc.durum);
  }
}

function verileriKontrolEt(kisi) {
  for (const deger in kisi) {
    if (kisi[deger]) {
    } else {
      const sonuc = {
        durum: false,
        mesaj: 'Boş bırakılamaz ⛔️',
      };
      return sonuc;
    }
  }
  verileriTemizle();
  return {
    durum: true,
    mesaj: 'Kaydedildi ✅',
  };
}

function bilgiOlustur(mesaj, durum) {
  const olusturulanBilgi = document.createElement('div');
  olusturulanBilgi.textContent = mesaj;
  olusturulanBilgi.className = 'bilgi';
  olusturulanBilgi.classList.add(durum ? 'bilgi-succes' : 'bilgi-error');

  document.querySelector('.main').insertBefore(olusturulanBilgi, form);
  // oluşan div formdan önce eklendi

  setTimeout(function () {
    document.querySelector('.bilgi').remove();
  }, 3000); //3 sn sonra siliniyor
}

function verileriTemizle() {
  ad.value = ' ';
  soyad.value = ' ';
  tel.value = ' ';
  email.value = ' ';
  adres.value = ' ';
}

function kisiyiekle(eklenecekKisi) {
  const olusturulanTr = document.createElement('tr');
  olusturulanTr.innerHTML = `
  <td>${eklenecekKisi.ad}</td>
  <td>${eklenecekKisi.soyad}</td>
  <td>${eklenecekKisi.tel}</td>
  <td>${eklenecekKisi.email}</td>
  <td>${eklenecekKisi.adres}</td>
  <td>
    <button class="btn btn--edit"><i class="far fa-edit"></i></button>
    <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
  </td>`;
  kisiListesi.appendChild(olusturulanTr);
  tumElemanlar.push(eklenecekKisi);
  bilgiOlustur('Kişi rehbere kaydedildi...', true);
}

function kisiIslemleriniYap(event) {
  if (event.tagret.classList.contains('btn--delete')) {
    const silinecekTr = event.tagret.parentElement.parentElement;
    const referansMail =
      event.tagret.parentElement.previousElementSibling.textContent;
    rehberdenSil(silinecekTr, referansMail);
  } else if (event.tagret.classList.contains('btn--edit')) {
    const referansTr = event.tagret.parentElement.parentElement;
    const referansMail = referansTr.cells[2].value;
    document.querySelector('.form-btn').value = 'Güncelle';
    ad.value = referansTr.cells[0].textContent;
    soyad.value = referansTr.cells[1].textContent;
    tel.value = referansTr.cells[2].textContent;
    email.value = referansTr.cells[3].textContent;
    adres.value = referansTr.cells[4].textContent;
    satir = referansTr;
    rehberdeGuncelle(satir);
  }
}

function rehberdenSil(silinecekTrElement, referansMail) {
  console.log(silinecekTrElement, referansMail);
  tumElemanlar.forEach((kisi, index) => {
    if (kisi.email === referansMail) {
      tumElemanlar.splice(index, 1);
    }
  });
  // silinecekTrElement.remove();
  console.log(tumElemanlar);
  verileriTemizle();
  document.querySelector('form-btn').textContent = 'Kaydet';
}

function rehberdeGuncelle(kisi) {
  for (let i = 0; i < tumElemanlar.length; i++) {
    if (tumElemanlar[i].email === satir.cells[2].textContent) {
      tumElemanlar[i] == kisi;
      break;
    }
  }

  satir.cells[0].textContent = kisi.ad;
  satir.cells[1].textContent = kisi.soyad;
  satir.cells[2].textContent = kisi.tel;
  satir.cells[3].textContent = kisi.email;
  satir.cells[4].textContent = kisi.adres;

  document.querySelector('.form-btn').value = 'Kaydet';
  satir = undefined;
}
