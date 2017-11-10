# Project Information Design
Een datavisualisatie over muziek van de afgelopen tien weken.

## Background
Voor het project Information Design moest er voor opdracht A een datavisualisatie gemaakt worden en waarin verschillende inzichten gehaald kunnen worden. Mijn onderwerp gaat over muziek en heb ik visualisatie gericht op streamingsdiensten, ook tijdens Research for Data. Spotify is een erg populaire streamingsdienst en leek het mij ook leuk om hier dieper in te verdiepen. 

De onderzoeksvraag die ik wil beantwoorden is: Hoeveel muziek worden er wereldwijd beluisterd?
Voordat ik was begonnen met coderen en te werken met de data was ik eerst aan het denken welke data visualisatie passend is met de data die ik wil laten zien. Ik begon eerst met schetsen maken hoe ik de data laat zien in de grafiek en welke grafiek passend is. Eerst begon ik al heel creatief te denken om een hele tijdlijn uit werken en per dag zou je kunnen zien wat de top hits er toen waren. Na coaching met Maaike bleek dit een leuke uitwerking te zijn voor opdracht B. Met de data die ik heb zou het te veel zijn en hebben we het deels ingekort naar muziek in de afgelopen tien weken.

Tijdens coaching waren we er ook achter gekomen dat een line chart heel passend is om de data te laten zien in een grafiek. Hiermee kan je het aantal streams tonen in combinatie met tijd (de afgelopen tien weken). In de grafiek is het mogelijk om de top hits van de wereld te bekijken van de afgelopen tien weken. Om de opdracht verder uit te werken heb ik een grafiek toegevoegd waarin te zien is hoe de top drie hits beluisterd word in verschillende landen van de wereld. De vraag die ik hiermee wil beantwoorden is: Worden er dezelfde populaire hits beluisterd in Canada als in Spanje, of in Indonesië?

Om de grafiek wat leuker te maken heb ik bij de tweede grafiek interactiviteit toegevoegd waarmee je data kan laten veranderen. Als je naar een ander song/land selecteert veranderd de waardes van de grafiek. Verder zie je direct ook de een groene kleur van de geselecteerde lijn in de grafiek.  

## Data
De data die ik heb gebruikt in deze datavisualisatie was in het eerste orginele idee een dataset van 43MB die gaat over de top 200 van 53 verschillende landen. De data varieert hier van januari 2017 tot en met augustus 2017, dagelijks was er de top 200 per land te vinden. De titel van deze dataset heet dan ook: Spotify's Worldwide Daily Song Ranking. De link naar deze dataset is hier te vinden: https://www.kaggle.com/edumucelli/spotifys-worldwide-daily-song-ranking. Om de data te controleren heb ik vanuit mijn onderzoek van Research of Data een site gevonden van Spotify die data weergeeft. Vanuit de dataset heb ik data gecontroleerd of het wel valide is.

In mijn eerste idee wou ik data weergeven van jan tot en met aug 2017. Doordat dit te veel data is was het eigenlijk onmogelijk om dit allemaal uit te werken in de tijdsperiode die we hebben. Door coaching met Maaike heb ik een oplossing gevonden om de opdracht verder uit werken, door de afgelopen tien weken te weergeven. Door data te verzamelen op https://www.spotifycharts.com heb ik data kunnen gebruiken van de afgelopen tien weken. Het is hier mogelijk om filters te gebruiken om zo bijvoorbeeld wereldwijd of juist per land te zoeken. (Om een voorbeeld te weergeven van zo'n dataset heb ik spotify_dataset.csv in github toegevoegd om een voorbeeld te weergeven). Hieraast heb ik wel twee datasets moeten gebruiken omdat er een gaat over muziek wereldwijd en een juist over landen, verder heb ik ook kleine delen moeten toevoegen bijvoorbeeld een datum, omdat deze niet te zien was in de dataset. Deze data heb ik vervolgens uitgewerkt in de grafieken, In de eerste grafiek is data te vinden hoe de top hits wereldwijd worden beluisterd. In de tweede grafiek is het mogelijk om zelf te filteren naar de top 3 hits beluisterd door verschillende landen. 

## Features
- [`d3.select`](https://github.com/d3/d3-selection/blob/master/README.md#select)
- [`d3.ScaleOrdinal`](https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal)
- [`d3.scaleTime`](https://github.com/d3/d3-scale/blob/master/README.md#scaleTime)
- [`d3.scaleLinear`](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear)
- [`d3.axis`](https://github.com/d3/d3-axis)
- [`d3.max`](https://github.com/d3/d3-array/blob/master/README.md#max)
- [`d3.nest`](https://github.com/d3/d3-collection/blob/master/README.md#nest)
- [`d3.extent`](https://github.com/d3/d3-array/blob/master/README.md#extent)
- [`d3.timeParse`](https://github.com/d3/d3-time-format/blob/master/README.md#timeParse)
- [`d3.timeFormat`](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormat)

## License
GPL-3.0 © Wesley Cheng.

[url]: https://wesleyc94.github.io/project/
