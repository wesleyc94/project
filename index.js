//Gebaseerd op code van https://bl.ocks.org/mbostock/3884955 van Mike Bostocks, 
//hiernaast ook de hulpcodes gebruikt uit de FED3 lessen - https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/axis van Titus Wormer. (Werkcolleges + Lesmateriaal)
//Hiernaast heb ik ook een tutorial gevolgd om de grafiek naar wens aan te passen, de tutorial is van Amber Thomas. De link naar de tutorial: http://amber.rbind.io/blog/2017/05/02/d3nest/ . 
//De data die ik hebt gebruikt was in het orgineel een bestand van 43 MB met de top 200 meest gestreamde songs in 53 landen op Spotify, deze is hier te vinden https://www.kaggle.com/edumucelli/spotifys-worldwide-daily-song-ranking. 
//Om deze data goed te valideren heb ik onderzoek gedaan en de data gecontroleerd of het betrouwbaar is. De data heb ik vergeleken met een site van Spotify. Dit is https://www.spotifycharts.com. Na coaching met Maaike hebben we overgelegd dat dit te veel data is om te laten zien en heb ik data van de afgelopen tien weken verzameld van SpotifyCharts.

//Ik maak hier een variabel svg aan en selecteer deze door d3.select. Verder defineer ik hier de marges van de grafiek en als het ware de dimensies en de grootte bepalen.
var svg = d3.select('svg');
var margin = { top: 0, right: 50, bottom: 20, left: 70 };
var width = svg.attr('width') - margin.left - margin.right;
var height = svg.attr('height') - margin.top - margin.bottom;
var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//Hieronder worden de grootte van de grafiek in kaart gebracht en maak ik een set kleurcodes aan die later gebruikt worden voor de kleur in de lijnen en legenda.
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var z = d3.scaleOrdinal(['#F3B3A6', '#59D2FE', '#44E5E7', '#5C7AFF', '#9f0000', '#fff400', '#2E5266', '#DB5461', '#593C8F', '#EF476F', '#0CCA4A', '#FCFAFA', '#008516', '#EFABFF', '#D36135', '#DB324D', '#AFFC41', '#0066FF', '#D80A26', '#FFC60C']);

//Ik defineer hier de marges voor een tweede grafiek.
var marginTwee = { top: 0, right: 70, bottom: 20, left: 100 },
    width5 = 1400 - marginTwee.left - marginTwee.right,
    height5 = 500 - marginTwee.top - marginTwee.bottom;

// Hier parse ik de variabel Week en laat deze parsen op dag en maand
var parseWeek = d3.timeParse("%d %b");
var formatWeek = d3.timeFormat("%d %b");

//Ik maak hier de svg canvas aan en selecteer deze op #graph
var svgTwee = d3.select("#graph")
    .append("svg")
    .style("width", width5 + marginTwee.left + marginTwee.right + "px")
    .style("height", height5 + marginTwee.top + marginTwee.bottom + "px")
    .attr("width", width5 + marginTwee.left + marginTwee.right)
    .attr("height", height5 + marginTwee.top + marginTwee.bottom)
    .append("g")
    .attr("transform", "translate(" + marginTwee.left + "," + marginTwee.top + ")")
    .attr("class", "svg");
    
//Hier zet ik alle informatie van de top hits bij elkaar zodat die later makkelijker aangesproken kunnen worden door een nummer, 
//door wisselvallige posities door de weken heen is het makkelijk om de song een nummer te geven.
var songsTop = {
    1: 'rockstar',
    2: 'Havana',
    3: 'New Rules',
    4: 'Wolves 4',
    5: 'What Lovers Do',
    6: 'Dusk Till Dawn',
    7: 'Perfect',
    8: 'Too Good At Goodbyes',
    9: 'Silence',
    10: '1-800-273-8255',
    11: 'I Fall Apart',
    12: 'Mi Gente',
    13: 'Look What You Made Me Do',
    14: 'Sorry Not Sorry',
    15: 'Friends',
    16: 'Unforgettable',
    17: 'Feels',
    18: 'Wild Thoughts',
    19: 'Despacito - Remix',
    20: 'XO TOUR Llif3'
};
//De data komt uit het index.txt bestand. In deze dataset is er alleen data te vinden over de top hits wereldwijd.
d3.text('index.txt')
    .mimeType('text/plain;charset=iso88591')
    .get(onload);

function onload(err, doc) {
    if (err) {
        throw err
    }
    // De ruwe data is vervolgens weer gecleaned door het goed te parsen, door een klein lijntje weg te knippen, en deze zoek ik door de tekst "Poistion,"
    var header = doc.indexOf('Position,')
    var end = doc.indexOf('\n', header)
    doc = doc.slice(end).trim()
    doc = doc.trim()
    doc = doc.replace(/ +/g, '')
    //Hier parse ik de tijd zodat deze gelezen kan worden
    var parseTime = d3.timeParse("%Y%m%d")
    var topHits = d3.csvParseRows(doc, map)
    //De map functie is handig voor het nesten en geef ik de waardes een key om aangesproken te worden
    function map(d) {
        if (d[7] == '') { return }
        return {
            name: songsTop[d[0]],
            date: parseTime((d[1])),
            streams: Number(d[5])
        }

    }

    topHits = d3.nest()
        .key(function(d) {
            return d.name;
        })
        .entries(topHits)
        .map(function(group) {
            return {
                name: group.key,
                values: group.values
            }
        });
    //Hier worden de range van de data aangepast. De x as gaan over datums en de y over het aantal streams, ik gebruik .nice om te wat fijner te maken kwa eindes.
    x.domain(d3.extent(flatten(topHits), date)).nice();
    y.domain(d3.extent(flatten(topHits), streams)).nice();
    z.domain(topHits.map(name));

    //Hier geef ik de lijn een kleine curve mee zodat deze niet te strak zijn.
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(lineX)
        .y(lineY);

    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de X as.
    g.append('g')
        .attr('class', 'axis x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de Y as.
    g.append('g')
        .attr('class', 'axis y')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .text('Streams');

    // Hier geef de waardes mee aan de lijnen in de grafiek
    var position = g
        .selectAll('.position')
        .data(topHits)
        .enter()
        .append('g')
        .attr('class', 'position');
    //Met deze waardes kan ik ook de lijnen bewerken en geef ik een kleurtje mee
    position
        .append('path')
        .attr('class', 'line')
        .attr('d', lineD)
        .style('stroke', lineStroke);

    //Standaard is er geen optie om een legenda aan te maken, op het internet heb ik opgezocht hoe ik dit kan toepassen en heb hier deze bron gebruikt: https://stackoverflow.com/questions/41090920/how-to-position-the-legend-in-a-d3-chart
    var legendaHolder = svg.append('g')
        // translate the holder to the right side of the graph
        .attr('transform', "translate(" + (margin.left + width) + ",0)")
    //Hier kan ik de legenda goed positioneren
    var legenda = legendaHolder.selectAll(".legend")
        .data(topHits)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 13 + ")"; });
    //De vierkantjes kan ik hier wijzigen door de width en height aan te passen, verder geef ik hier ook weer een fill mee met de waardes en hiermee de kleurcodes
    legenda.append("rect")
        .attr("x", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i) { return z(d.name); });
    //De legenda heeft ook tekst en die data haal ik weer uit d.name
    legenda.append("text")
        .attr("x", 20)
        .attr("y", 3)
        .attr("dy", ".60em")
        .text(function(d) { return d.name; });

    //Functies om de data op een andere manier te laten teruggeven
    function lineX(d) {
        return x(date(d));
    }

    function lineY(d) {
        return y(streams(d));
    }

    function lineD(d) {
        return line(values(d));
    }

    function lineStroke(d) {
        return z(name(d));
    }

    function transformText(d) {
        var last = d.values[d.values.length - 1];
        return 'translate(' + x(date(last)) + ',' + y(streams(last)) + ')';
    }
}

function flatten(value) {
    return [].concat.apply([], value.map(values));
}

function values(d) {
    return d.values;
}

function name(d) {
    return d.name;
}

function date(d) {
    return d.date;
}

function streams(d) {
    return d.streams;
}

// Hier defineer ik de range van de tweede grafiek
var x5 = d3.scaleTime().range([0, width5]);
var y5 = d3.scaleLinear().range([height5, 0]);

// Hier defneer ik de lijn en geef ook hier een curve aan mee
var valueLine = d3.line()
    .curve(d3.curveBasis)
    .x(lineX2)
    .y(lineY2);

//functies om de data makkelijker terug te geven
function lineX2(d) {
    return x5(d.Datum);
}

function lineY2(d) {
    return y5(+d.Streams);
}

//De data importeer ik uit een csv bestand genaamd landen.csv, ik heb een tweede bestand omdat ik nu met verschillende landen ga werken. 
d3.csv("landen.csv", function(error, data) {
    if (error) throw error;

    //Hier formateer ik de data uit het bestand
    data.forEach(function(d) {
        d.Datum = parseWeek(d.Datum);
        d.Streams = +d.Streams;
        d.Song = d.Song;
        d.Land = d.Land;
    });


    var nest = d3.nest()
        .key(function(d) {
            return d.Song;
        })
        .rollup(function(leaves) {
            var max = d3.max(leaves, function(d) {
                return d.Streams
            })
            var land = d3.nest().key(function(d) {
                    return d.Land
                })
                .entries(leaves);
            return { max: max, land: land };
        })
        .entries(data)

    //Voor de tweede grafiek schaal ik hier de ranges van de data
    x5.domain(d3.extent(data, function(d) { return d.Datum; })).nice();
    y5.domain([0, d3.max(data, function(d) { return d.Streams; })]);

    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de X as.
    var xaxis = svgTwee.append("g")
        .attr("transform", "translate(0," + height5 + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x5)
            .tickFormat(d3.timeFormat("%d %b")));


    // Ik maak hier een variabel songsMenu aan en selecteer deze op de dropdown #top3
    var songsMenu = d3.select("#top3")
    //Hiermee worden er nieuwe elementen aan mee gegeven
    songsMenu
        .append("select")
        .selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d) {
            return d.key;
        })
        .text(function(d) {
            return d.key;
        })

    //Hier maak de een tweede variabel aan voor de tweede dropdown
    var landenMenu = d3.select("#landen")
    //Ook hier worden en nieuwe elementen toegevoegd
    landenMenu
        .data(nest)
        .append("select")
        .selectAll("option")
        .data(function(d) { return d.value.land; })
        .enter()
        .append("option")
        .attr("value", function(d) {
            return d.key;
        })
        .text(function(d) {
            return d.key;
        })

    // Dit is een functie om de huidige grafiek te laten zien
    var initialGraph = function(now) {

        // Hiermee worden de data gefilterd
        var selectHit = nest.filter(function(d) {
            return d.key == now;
        })

        //Hiermee geef ik data mee aan de grafiek en selecteer deze op songsGroup
        var selectSongs = svgTwee.selectAll(".songsGroup")
            .data(selectHit, function(d) {
                return d ? d.key : this.key;
            })
            .enter()
            .append("g")
            .attr("class", "songsGroup")
            .each(function(d) {
                y5.domain([0, d.value.max])
            });
        //Hier geef ik waardes mee aan de lijnen, de waardes worden uit de variable selectSongs gepakt en kan deze vervolgens meegeven aan de lijnen
        var initialPath = selectSongs.selectAll(".line")
            .data(function(d) { return d.value.land; })
            .enter()
            .append("path")

        initialPath
            .attr("d", function(d) {
                return valueLine(d.values)
            })
            .attr("class", "line")

        //De Y axis geef ik ticks mee om de stappen (stream waardes) aan te passen
        var yaxis = svgTwee.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y5)
                .ticks(5)
                .tickSizeInner(0)
                .tickPadding(6)
                .tickSize(0, 0));

        //Labels aan de y as
        svgTwee.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 60)
            .attr("x", 0 - (height5 / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Aantal Streams")
            .attr("class", "y axis label");

    }

    //De eerste grafiek laat ik zien op rockstar - Post Malone
    initialGraph("rockstar - Post Malone")

    // Dit is een variabel updateGraph met een functie om de grafiek te laten updates
    var updateGraph = function(now) {

        // Data filteren
        var selectHit = nest.filter(function(d) {
            return d.key == now;
        })

        //Hiermee selecteer ik alle gegroepeerde elementen en update ik de data
        var selectSongs = svgTwee.selectAll(".songsGroup")
            .data(selectHit)
            .each(function(d) {
                y5.domain([0, d.value.max])
            });
        //Hier selecteer ik alle lijnen en in een transitie veranderd dit naar nieuwe posities
        selectSongs.selectAll("path.line")
            .data(function(d) { return d.value.land; },
                function(d) { return d.key; })
            .transition()
            .duration(1000)
            .attr("d", function(d) {
                return valueLine(d.values)
            })
    }

    //Wanneer er op de dropdown iets veranderd word deze functie aangeroepen
    songsMenu.on('change', function() {

        // Zoek welke value er is geselecteerd
        var selectedFruit = d3.select(this)
            .select("select")
            .property("value")

        //Functie update de data van de geselecteerde hit
        updateGraph(selectedFruit)

    });

    //Hiermee veranderd de kleur als de dropdown veranderd naar een nieuwe geselecteerd waarde
    landenMenu.on('change', function() {

        // Zoek welke value er is geslecteerd
        var selectedLand = d3.select(this)
            .select("select")
            .property("value")

        // Hiermee worden de classes aangepast naar selected als deze dus geselecteert is
        var selLine = svgTwee.selectAll(".line")
            // Deselecteren van de lijnen
            .classed("selected", false)
            .filter(function(d) {
                return d.key === selectedLand
            })
            // Class meegeven aan de selected lijn
            .classed("selected", true)
            .raise()
    })

})