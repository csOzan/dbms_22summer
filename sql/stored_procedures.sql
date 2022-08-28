CREATE OR REPLACE FUNCTION MusteriSayisi()
RETURNS INTEGER AS $total$
declare
	total integer;
BEGIN
	SELECT count(*) into total FROM musteriler;
	RETURN total;
END;
$total$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION KisiSayisi()
RETURNS INTEGER AS $total$
declare
	total integer;
BEGIN
	SELECT count(*) into total FROM kisiler;
	RETURN total;
END;
$total$ LANGUAGE plpgsql;

-- Arguman olarak verilen kodddaki ili silmeyi saglayan fonksiyon
CREATE OR REPLACE FUNCTION IlSil (kod integer) RETURNS void AS $$
BEGIN
	DELETE FROM iller WHERE "il_ID"=kod;
END;
$$ LANGUAGE plpgsql;

-- Puani 5'in altinda olan satici ve musteri hizmetlerinin silinmesini saglayan fonksiyon
CREATE OR REPLACE FUNCTION SaticiMusteriHizSil() RETURNS void AS $$
BEGIN
	DELETE FROM saticilar WHERE "puan" < 5;
	DELETE FROM musteri_hizmetleri WHERE "puan" < 5;
END;
$$ LANGUAGE plpgsql;