# Neural Network

Create a Neural Network and a program that can make predictions utilizing the Neural Network

## Pre-reads

* IBM's overview of [Neural Networks](https://www.ibm.com/cloud/learn/neural-networks)
* ML5 page on their Neural Network feature: https://learn.ml5js.org/#/reference/neural-network
* Dive into Neural Network Choices (skim)
  * [Current best answer concerning hidden layers](https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw)
  * [Configuring layers](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)
  * [Activation Functions](https://machinelearningmastery.com/choose-an-activation-function-for-deep-learning/)
* Peruse the UC-Irvine Machine Learning Repository of datasets: https://archive-beta.ics.uci.edu/datasets. Try filtering by classification problems (though you are free to try regression problems as well), since that will be your most straightforward path through this assignment.  

## Starter Code Overview

The code is more or less directly translated from the ml5 page, along with some drawing functionality, and the ability to generate random data with which to use the classifier. 

Here is a description of the dataset. 

> There are 10 predictors, all quantitative, and a binary dependent variable, indicating the presence or absence of breast cancer. The predictors are anthropometric data and parameters which can be gathered in routine blood analysis. Prediction models based on these predictors, if accurate, can potentially be used as a biomarker of breast cancer. Quantitative Attributes: Age (years) BMI (kg/m2) Glucose (mg/dL) Insulin (µU/mL) HOMA Leptin (ng/mL) Adiponectin (µg/mL) Resistin (ng/mL) MCP-1(pg/dL) Labels: 1=Healthy controls 2=Patients. [Example data source]( https://archive-beta.ics.uci.edu/dataset/451/breast+cancer+coimbra)

## Assignment 

Find a dataset, build a neural network with it, and make classifications with it. 

### Requirements

* You need to use a different dataset appropriate for your neural network's objective (classification or regression)
* Your program should ouput the result of giving new data to the network, as well as the confidence.
* Build in saving and loading functionality (using the appropraite ml5 functions) so that once you have your model trained as you like it, you don't have to retrain it every time the sketch runs. 

### _Some_ Ideas for Ways to Expand on This Project. 

* Build a more full-featured input method (text input, sliders)
* Really dig in to the _hyper parameters_ for your model. 

<!--- Footnotes Below --->
