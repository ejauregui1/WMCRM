function onOpen(e) {
  let ui = SpreadsheetApp.getUi(); 
  ui.createMenu("CS Tools")
    .addItem("Show Reps", "showReps")
    .addItem("Move to Top Accounts", "moveTopAccounts")
    .addItem("Create Folder", "createFolder")
    .addSeparator()
    .addItem('Resources', 'userGuide')
    .addToUi();
}

function showReps() {
  let ss = SpreadsheetApp.getActiveSpreadsheet(); 
  let sheet = ss.getActiveSheet(); 
  let lastRow = sheet.getLastRow(); 
  let lastCol = sheet.getLastColumn(); 
  let repRange = sheet.getRange(1,2,lastRow); 
  let row = repRange.getRow(); 
  let col = repRange.getColumn(); 

  if (sheet.isColumnHiddenByUser(2) == true) {
    sheet.showColumns(1,2); 
    sheet.getRange(1,1, lastRow).activate(); 
    
  } else {
    sheet.hideColumns(1,2); 
  }; 
}

function moveTopAccounts() {
  let ss = SpreadsheetApp.getActiveSpreadsheet(); 
  let all_accounts = ss.getSheetByName('All_Accounts'); 
  let top_accounts = ss.getSheetByName('Top_Accounts'); 
  let initLastTopRow = top_accounts.getLastRow();
  //let checkBoxRange = all_accounts.getRange(2,1,lastAllRow); 
  //let checkBoxRangeValue = checkBoxRange.getValues(); 

  // DATA VALIDATION RULES 
  let healthRule = SpreadsheetApp.newDataValidation().requireValueInList(['Very Good', 'Good', 'Meh', 'Bad', 'Very Bad']).build(); 
  let dateRule = SpreadsheetApp.newDataValidation().requireDate().build(); 

  // Logger.log(checkBoxRangeValue); // << RETURNS VALUES 

  let lastAllRow = all_accounts.getLastRow(); let lastAllCol = all_accounts.getLastColumn(); 
  for (var i = 1; i <= lastAllRow; i++) {

    let checkRangeValue = all_accounts.getRange(i,1).getValue(); 
    let checkAccountName = all_accounts.getRange(i,5).getValue(); 
    // Logger.log(typeof(checkAccountName)); 
    // Logger.log(checkRangeValue); << RETURNS TRUE/FALSE VALUES 

    
    if (checkRangeValue == true) {

      // SETTING RANGE VARIABLES 
      let lastTopRow = top_accounts.getLastRow(); 
      let lastTopCol = top_accounts.getLastColumn(); 
      
      // FINDING AND MOVING VALUES 
      let checkCell = all_accounts.getRange(i,1);  // Logger.log(checkCell); << RETURNS A33 with getA1Notation
      let ae = all_accounts.getRange(i,2).getValue(); top_accounts.getRange(lastTopRow+1, 1).setValue(ae); 
      let csr = all_accounts.getRange(i,3).getValue(); top_accounts.getRange(lastTopRow+1, 2).setValue(csr);  
      let parentAccount = all_accounts.getRange(i,4).getValue(); top_accounts.getRange(lastTopRow+1,3).setValue(parentAccount); 
      let accountName = all_accounts.getRange(i,5).getValue(); top_accounts.getRange(lastTopRow+1,4).setValue(accountName); 
      let type = all_accounts.getRange(i,7).getValue(); top_accounts.getRange(lastTopRow+1,5).setValue(type); 
      let region = all_accounts.getRange(i,8).getValue(); top_accounts.getRange(lastTopRow+1,6).setValue(region).setHorizontalAlignment('center'); 
      // let whale = all_accounts.getRange(i,6).getValue(); top_accounts.getRange(lastTopRow+1, 7).insertCheckboxes(whale); // https://developers.google.com/apps-script/reference/spreadsheet/range#insertcheckboxes
      let whale = all_accounts.getRange(i,6).getValue(); top_accounts.getRange(lastTopRow+1, 7).setValue(whale); 
      top_accounts.getRange(lastTopRow+1,8).setDataValidation(healthRule); 
      top_accounts.getRange(lastTopRow+1,9).setValue('Listing'); 
      top_accounts.getRange(lastTopRow+1,10).setValue('Drive'); 
      top_accounts.getRange(lastTopRow+1,11).setValue('Documentation'); 
      let tier = all_accounts.getRange(i,9).getValue(); top_accounts.getRange(lastTopRow+1,12).setValue(tier); 
      let bcv = all_accounts.getRange(i,10).getValue(); top_accounts.getRange(lastTopRow+1, 13).setValue(bcv); 
      let dateCell = top_accounts.getRange(lastTopRow+1,14); dateCell.setDataValidation(dateRule); 
      let lastActivity = all_accounts.getRange(i,11).getValue(); top_accounts.getRange(lastTopRow+1,14).setValue(lastActivity); 
      let menu = all_accounts.getRange(i,12).getValue(); top_accounts.getRange(lastTopRow+1,15).setValue(menu); 
      let store = all_accounts.getRange(i,13).getValue(); top_accounts.getRange(lastTopRow+1,16).setValue(store); 
      let pos = all_accounts.getRange(i,14).getValue(); top_accounts.getRange(lastTopRow+1, 17).setValue(pos); 
      let orders = all_accounts.getRange(i,15).getValue(); top_accounts.getRange(lastTopRow+1,18).setValue(orders); 
      top_accounts.getRange(lastTopRow+1,1,1,lastTopCol).setFontSize(12);    
      all_accounts.getRange(i,1).setValue(false);   
    }    
  }
}

function userGuide() {
  var guide = HtmlService
    .createHtmlOutput('<a href="https://docs.google.com/document/d/1JlXN7pemAvo4QKXSWrfAIjeH5QG3a2yWEJjk_2X9HCM/edit">User Guide</a>')
      .setWidth(1000)
      .setHeight(1500);

  var request = HtmlService
    .createHtmlOutput('<a href="https://docs.google.com/forms/d/1Vxo2pDdyQnWLeMR6028PJM9_LfRHjlTA75MM_dVobRI/edit">Feature Request</a>')
      .setHeight(1000)
      .setWidth(1500); 

  SpreadsheetApp.getUi().showModalDialog(guide, "User Guide"); 
  // SpreadsheetApp.getUi().showModalDialog(request, "Feature Request"); 
}

function createFolder() {
  let ss = SpreadsheetApp.getActiveSpreadsheet(); 
  let sheet = ss.getActiveSheet(); 
  let cell = sheet.getActiveCell(); 
  let cellValue = cell.getValue(); 
  let parentFolderID = '1v_iARtl0xpii5MiP5q9jPsXY1FH3c5QZ'; 


  if (parentFolderID == '') {
    let response = SpreadsheetApp.getUi().prompt('Please add parent folder ID'); 
    parentFolderID = response.getResponseText(); 
  }; 

  // CREATES FOLDER AND RETURNS FOLDER ID 
  let parentFolder = DriveApp.getFolderById(parentFolderID); 
  let newFolder = parentFolder.createFolder(cellValue).getId(); 
  // Browser.msgBox(newFolder); 
  // DriveApp.getFolderById(newFolder).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT); 
  let url = 'https://drive.google.com/drive/u/0/folders/' + newFolder; 
  
  // LINKS FOLDER TO CELL
  let richValue = SpreadsheetApp.newRichTextValue()
    .setText(cellValue)
    .setLinkUrl(url)
    .build(); 

  cell.setRichTextValue(richValue); 
  let destFolder = DriveApp.getFolderById(newFolder); 
  let newFile = DriveApp.getFileById('1sFqyNkULtqH1Z6gGJ18fI8Wcvk3BWax3Qj6ZcyEqfuA').makeCopy(cellValue, destFolder); 
  
}
