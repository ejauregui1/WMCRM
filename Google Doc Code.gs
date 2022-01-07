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

  MailApp.sendEmail('jpalumbo@weedmaps.com', 'Meeting Added To ' + documentTitle, 'Meeting added to ' + documentTitle + ' by ' + user + '\n\n' + url);
   
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

  // GET SELECTION
  let selection = doc.getSelection(); 

  let note = ''; 

  if (!selection) {
    note += 'Nothing selected'
  } else {
    let elements = selection.getSelectedElements(); 
    // note += user + ' added ' + elements.length + ' item '; 
    if (elements.length > 1) {
    } else {
      let element = elements[0].getElement(); 
      let startOffset = elements[0].getStartOffset(); 
      let endOffset = elements[0].getEndOffsetInclusive(); 
      let selectedText = element.asText().getText(); 
      if (elements[0].isPartial())
        selectedText = selectedText.substring(startOffset,endOffset+1); 

        // Google Doc UI "word selection" (double click)
        // selects trailing spaces - trim them
        selectedText = selectedText.trim(); 
        endOffset = startOffset + selectedText.length - 1; 

        // Now ready to hand off to format, setLinkUrl, etc.
        note += selectedText; 
        note += 'and is ' + (elements[0].isPartial() ? "part" : "all") + " of the paragraph"; 
    }
  }

  ui.alert(note); 

  // LEADERSHIP 
  MailApp.sendEmail('jpalumbo@weedmaps.com', user + ' updated notes for ' + documentTitle, update + '\n\n' +  note + '\n\n' + url);   

  // REPS 

   
} 

