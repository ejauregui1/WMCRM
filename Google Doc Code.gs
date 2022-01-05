function onOpen(e) {
  let ui = DocumentApp.getUi(); 
  ui.createMenu('CS Tools')
    .addItem('Add Meeting Notes', 'addMeeting')
    .addToUi(); 
}; 

function addMeeting() {
  let body = DocumentApp.getActiveDocument().getBody(); 
  let date = Utilities.formatDate(new Date(), "GMT-8", "MM/dd/yyyy");
  
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
}
