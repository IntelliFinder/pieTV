//pattern based on http://bl.ocks.org/enjalot/1525346
//convert to array
var prices_csv = function()
{
    var a1 = [],
        a2 = [],
        a3 = [];
    d3.csv("http://DynDNS.com/vatbox.csv", function(data)
    {
        //dataset is an array of json objects containing the data in from the csv
        
        data.map(function(d)
        {
           //each d is one line of the csv file represented as a JSON object
            a1.push(d.group);
            a2.push(d.country);
            a3.push(+d.amount);
           
        })
        circos(a1, a2, a3);
    });
}
prices_csv();