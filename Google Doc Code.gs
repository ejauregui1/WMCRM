function onOpen(e) {
  let ui = DocumentApp.getUi(); 
  ui.createMenu('CS Tools')
    .addItem('Add Meeting Notes', 'addMeeting')
    .addItem('Add Customer Objective', 'addObjective')
    .addItem('Notify Team', 'notifyTeam')
    .addToUi(); 
}; 

function addMeeting() {

  // SETTING UNIVERSAL VARIABLES 
  let doc = DocumentApp.getActiveDocument(); 
  let body = DocumentApp.getActiveDocument().getBody(); 
  let date = Utilities.formatDate(new Date(), "GMT-8", "MM/dd/yyyy");
  let documentTitle = DocumentApp.getActiveDocument().getName(); 
  let user = Session.getActiveUser(); 
  let url = DocumentApp.getActiveDocument().getUrl(); 
  
  // SETS MEETING HEADERS
  let meetingHeader = body.appendParagraph('Meeting - ' + date); 
  let meetingHeaderStyle = {}; 
  meetingHeaderStyle[DocumentApp.Attribute.BOLD] = true; 

  // CREATES A TWO-DIMENSIONAL ARRAY CONTAINING CELL CONTENTS 
  let cells = [
    ['Topic', ''],
    ['Attendees','' ], 
    ['Notes', ''],
    ['Action Items', '']
  ]; 

  // BUILDS TABLE FROM ARRAY
  //meetingHeader.setAttributes(meetingHeaderStyle); 
  meetingHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendTable(cells).setColumnWidth(0,80);

  MailApp.sendEmail('j@weedmaps.com', 'Meeting Added To ' + documentTitle, 'Meeting added to ' + documentTitle + ' by ' + user + '\n\n' + url);
   
}

function addObjective() {

  // SETTING COMMON VARIABLES 
  let doc = DocumentApp.getActiveDocument(); 
  let body = doc.getBody(); 
  let documentTitle = doc.getName(); 
  let user = Session.getActiveUser(); 
  let url = doc.getUrl(); 
  let date = Utilities.formatDate(new Date(), "GMT-8", "MM/dd/yyyy"); 


  // OUTLINES TABLE TO BE BUILT
  let cells = [
    ['Objective', ''],
    ['As measured by', ''],
    ['Due Date', ''],
    ['Account Plan', ''],
    ['Milestones', ''], 
    ['Status', '']
  ]; 

  
  let objectives = body.getParagraphs(); 
  let objectiveCount = 1;

  for (var j = 0; j < objectives.length; j++) {
    let searchText = objectives[j].getText();
    //Logger.log(j); 
    Logger.log(searchText);

    if (searchText === "Objective") {
      objectiveCount++;  
      Logger.log(objectiveCount); 
    }
  };  

  Logger.log(objectiveCount);
  let objectiveHeader = body.appendParagraph('Customer Objective ' + objectiveCount); 

  // SETTING SEARCH VARIABLES FOR TABLE INSERT 
  // let target = 'Contacts'; 
  // let title = '\n\nCustomer Objective (added ' + date + ' by ' + user + ')'; 

  // LOOKS FOR "ACCOUNT STRATEGY" AND INSERTS TABLE AS CHILD 
  // var paragraphs = body.getParagraphs(); 

/*   for (var i = 0; i < paragraphs.length; i++) {
    var text = paragraphs[i].getText(); 

    if (text == target) {
      //Logger.log(i); 
      //Logger.log(text); 
      let title = body.insertParagraph(i, '\n\nCustomer Objective ' + objectiveCount); 
      title.setHeading(DocumentApp.ParagraphHeading.HEADING2); 
      body.insertTable(i, cells).setColumnWidth(0,90);
      //MailApp.sendEmail('jpalumbo@weedmaps.com', 'Customer Objective Added To ' + documentTitle, 'New objective added to ' + documentTitle + ' by ' + user + '\n\n' + url);
      break;
    }
    
  } */

  // ADDS CUSTOMER OBJECTIVE HEADER AND TABLE TO BOTTOM OF DOCUMENT 
  objectiveHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendTable(cells).setColumnWidth(0,95);


}; 
  

function notifyTeam(){

  // SETTING COMMON VARIABLES 
  let doc = DocumentApp.getActiveDocument(); 
  let body = doc.getBody();
  let userActive = Session.getActiveUser(); 
  let documentTitle = DocumentApp.getActiveDocument().getName(); 
  let url = doc.getUrl(); 

  // ASKING FOR INPUT 
  let ui = DocumentApp.getUi(); 
  let response = ui.prompt('What was updated?')
  let update = response.getResponseText(); 
  Logger.log(update); 

  // CONVERTS USER OBJECT TO SHORT USER NAME 
  let userString = userActive.toString(); 
  let userSplit = userString.split('@'); 
  let user = userSplit[0]; // RETURNS SHORT USER NAME 

  // LEADERSHIP 
  MailApp.sendEmail('j@weedmaps.com', user + ' added an update to ' + documentTitle, update + '\n\n' +  url);   
  MailApp.sendEmail('k@weedmaps.com', user + ' added an update to ' + documentTitle, update + '\n\n' +  url);   

  // REPS 

   
} 

