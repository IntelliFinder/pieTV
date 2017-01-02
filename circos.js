/**
 * ABOUT THIS SCRIPT :
 * <p>
 * Creates a chord diagram based on a matrix:
 * for each row correspodning to an artist, a link
 * is established using the value of each column
 * corresponding to the other artists.
 * </p>
 * <p>
 * This script is based on a JavaScript program
 * by Michael Bostock (http://d3js.org/ and https://github.com/mbostock/d3),
 * which can be found at http://bl.ocks.org/4062006 . For more info on
 * chord diagrams: http://circos.ca/ .
 * </p>
 * 
 * <p>
 * This script is written by Joris Schelfaut. For more info
 * consult http://soundsuggest.wordpress.com/ .
 * </p>
 */
var circos = function (a1, a2, a3) {
    var width = 700
        , height = 700;
    var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //checking for numeric value
    //Extracting data from arrays into the variables according to matrix demands
    //Compiling and Running JAVA code
    /*
    import java.util.*;
    import java.lang.*;
    import java.io.*;
    import java.lang.System; 
    /* Name of the class has to be "Main" only if the class is public. */
    /*class Ideone
    {
        public static void main (String[] args) throws java.lang.Exception
        {
        List<Integer> reg = new ArrayList<Integer>();
        List<Integer> proxy2 = new ArrayList<Integer>();
        List<Integer> proxy = new ArrayList<Integer>();
        String[] a1={"Amazon","Amazon","Amazon","Dell","Dell","Dell"};
        int[] a3={1,2,3,4,5,6};
        boolean bool=false;
        int i=0;
        String first=a1[0];
        
    while(i<a1.length && !bool){
        //2nd entity
        if(first!=a1[i]){
            int  j=i;
            
           while(j<a1.length){
                if(j!=i && j!=i+1){
                proxy2.add(a3[j]);
            } else {reg.add(a3[j]);}
           j++;
           }
           bool=true;
        }
        // First entity
        if(!bool){
        if(i!= 0&& i!=1){
        proxy.add(a3[i]);
        }else {reg.add(a3[i]);}
        i++;
        }
    }
    //sum up proxy arrays 
    int total=0;
    int total2=0;
    for(int z=0;z<proxy.size(); z++){
        total+=proxy.get(z);
    }
    for(int k=0;k<proxy2.size(); k++){
        total2+=proxy2.get(k);
    }
    System.out.println(proxy);System.out.println(proxy2);
    System.out.println(total);
    System.out.println(total2);
    System.out.println(reg);*/
    var reg = [],
        proxy2 = [],
        proxy = [],
        i = 0,
        bool = false,
        first = a1[i],
        j,
        total1,
        total2;

    while (i < a1.length && !bool) {
        //2nd entity
        if (first !== a1[i]) {
            j = i;

            while (j < a1.length) {
                if (j !== i && j !== i + 1) {
                    proxy2.push(a3[j]);
                } else { reg.push(a3[j]); }
                j++;
            }
            bool = true;
        }
        // First entity
        if (!bool) {
            if (i !== 0 && i !== 1) {
                proxy.push(a3[i]);
            } else { reg.push(a3[i]); }
            i++;
        }
        for (var z in proxy) {
            total += proxy[z];
        }
        for (var k in proxy2) {
            total2 += proxy2[k];
        }
    }
        var matrix5x5 = [
              [0, 0, reg[0], reg[1], total]
            , [0, 0, reg[2], reg[3], total2]
            , [a[0], a[2], 0, 0, 0]
            , [a[1], a[3], 0, 0, 0]
            , [total, total2, 0, 0, 0]

        ];


        var range5 = ["#000000", "#33585e", "#957244", "#F26223", "#155420"];
        var chord = d3.layout.chord().padding(.05).sortSubgroups(d3.descending).matrix(matrix5x5);
        var fill = d3.scale.ordinal().domain(d3.range(range5.length)).range(range5);
        var innerRadius = Math.min(width, height) * .41;
        var outerRadius = innerRadius * 1.1;
        svg.append("g").selectAll("path").data(chord.groups).enter().append("path").style("fill", function (d) {
            return fill(d.index);
        }).style("stroke", function (d) {
            return fill(d.index);
        }).attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius)).on("mouseover", fade(.1)).on("mouseout", fade(1));
        svg.append("g").attr("class", "chord").selectAll("path").data(chord.chords).enter().append("path").style("fill", function (d) {
            return fill(d.target.index);
        }).attr("d", d3.svg.chord().radius(innerRadius)).style("opacity", 1);
        var range5_artists = ["Amazon", "Dell", "GB", "BE", "Other"];
        svg.selectAll("text").data(chord.groups).enter().append("text").text(function (d) {
            return range5_artists[d.index];
        }).attr("x", function (d) {
            return -width / 2 + d.index * width / range5_artists.length;
        }).attr("y", function (d) {
            return -height / 2 + 30;
        }).attr("font-size", "35px").attr("fill", function (d) {
            return range5[d.index];
        }).on("mouseover", fade(.1)).on("mouseout", fade(1));

        function fade(opacity) {
            return function (g, i) {
                svg.selectAll("g.chord path").filter(function (d) {
                    return d.source.index != i && d.target.index != i;
                }).transition().style("opacity", opacity);
            };
        }

    }
}