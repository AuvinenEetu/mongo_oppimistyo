# MongoDB oppimistyö

---------------------
## Projektin kuvaus

Tästä repositoriosta löydät vedonlyöntisovellukselle rakennetun MongoDB-tietokannan ja luomani esimerkkidatan jolla pääset testaamaan kannan toimivuutta. Valitsin mongon ensimmäisen oppimistehtäväni teknologiaksi koska halusin käyttää sitä vielä hieman enemmän kuin mitä kurssilla ehdimme. Mongo sopii hyvin tällaiseen projektiin sen joustavuuden ja skaalautuvuuden takia, mutta luultavasti tuotantoon menevässä sovelluksessa käyttäisimme ennemmin jonkinnäköistä relaatiotietokantaa vähintään mongon lisäksi, sen takia koska sovelluksessa liikkuisi ehkä jopa suuria summia rahaa joten ACID periaatteet olisivat hyvinkin tärkeitä.



---------------------
## Ohjeet mongo tietokannan pystyttämiseen.
1. Kloonaa tämä repositorio `git clone https://github.com/AuvinenEetu/mongo_oppimistyo`
2. Avaa powershell ja siirry kloonattuun kansioon `cd .\mongo_oppimistyo\`
3. Aja komento `docker compose up -d`
4. Pystytä kanta ja lisää esimerkkidatat seuraavilla komennoilla (HUOM! Vaihda kontinnimi pystyttämäsi docker kontin nimeksi, minun tapauksessani mongo-server)
5. `docker exec -i kontinnimi mongoimport -u root -p password --authenticationDatabase=admin --drop -d vedonlyontikanta -c users --jsonArray < esimerkkidata/users.json`
6. `docker exec -i kontinnimi mongoimport -u root -p password --authenticationDatabase=admin --drop -d vedonlyontikanta -c users --jsonArray < esimerkkidata/events.json`
7. `docker exec -i kontinnimi mongoimport -u root -p password --authenticationDatabase=admin --drop -d vedonlyontikanta -c users --jsonArray < esimerkkidata/bets.json`


