// Code skeleton provided by instructor Sakib

function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let metadata = data.metadata;
  
    // Filter the data for the object with the desired sample number
    // YOUR CODE HERE 
    let resultMetadata = metadata.filter(metadataObj => metadataObj.id == sample);
    let result0 = resultMetadata[0]

	// Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (key in result0){

      // YOUR CODE HERE 
      PANEL.append("div").text(`${key}: ${result0[key]}`);
    };
})}

function buildCharts(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let bubbleLayout = {

      // YOUR CODE HERE 
      showlegend: false,
      height: 500,
      width: 1300
    };
	
    let bubbleData = [{
      
      // YOUR CODE HERE 
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
      color: otu_ids,
      size: sample_values
        }}

    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
      
      // YOUR CODE HERE 
      {
        x: sample_values,
        y: yticks,
        type: 'bar',
        text:  otu_labels,
        orientation: "h",
        marker: {
          color: 'rgb(142,124,195)'
        }
 
      }
    ];

    let barLayout = {

      // YOUR CODE HERE 
      height: 500,
      width: 1000,
      margin: {
        l: 75,
        r: 1,
        t: 10,
        b: 50
    
      }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let sampleNames = data.names;

    for (let i = 0; i < sampleNames.length; i++){
      
      // YOUR CODE HERE 
      samName = sampleNames[i];
      selector.append("option")
      .attr("value", samName)
      .text(samName);
    };

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

