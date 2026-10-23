/**
 * Vaishno Vyom — enquiry receiver.
 * Saves every website enquiry to this Google Sheet and emails the sales team.
 * Setup steps are in the project README ("Connect the enquiry form").
 */

// ---- Settings -------------------------------------------------------------
var SHEET_NAME = 'Leads';
// Who gets the email alert. Separate several addresses with commas.
var NOTIFY_EMAILS = 'sales@vaishnosky.com';
// Optional. If you set a value here, put the same value in GOOGLE_SCRIPT_SECRET on the website.
var SHARED_SECRET = '';
// ---------------------------------------------------------------------------

var HEADERS = ['Received', 'Name', 'Mobile', 'Email', 'Configuration', 'Message', 'Source', 'Page URL'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return reply({ ok: false, error: 'unauthorized' });
    }
    if (!data.name || !data.mobile) {
      return reply({ ok: false, error: 'name and mobile are required' });
    }

    var sheet = getSheet();
    var received = new Date();
    sheet.appendRow([
      received,
      safe(data.name),
      "'+91 " + String(data.mobile).replace(/\D/g, ''),
      safe(data.email),
      safe(data.configuration),
      safe(data.message),
      safe(data.source),
      safe(data.pageUrl),
    ]);

    var emailed = true;
    try {
      sendAlert(data, received);
    } catch (mailError) {
      // The lead is already saved; an email failure must not lose it.
      emailed = false;
      console.error(mailError);
    }

    return reply({ ok: true, emailed: emailed });
  } catch (error) {
    console.error(error);
    return reply({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the web app URL in a browser to confirm it is live.
function doGet() {
  return reply({ ok: true, service: 'Vaishno Vyom enquiry receiver' });
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#280F24').setFontColor('#CDA454');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendAlert(data, received) {
  var rows = [
    ['Name', data.name],
    ['Mobile', '+91 ' + data.mobile],
    ['Email', data.email || '—'],
    ['Configuration', data.configuration || '—'],
    ['Message', data.message || '—'],
    ['Came from', data.source || '—'],
    ['Page', data.pageUrl || '—'],
    ['Received', Utilities.formatDate(received, 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a') + ' IST'],
  ];
  var html =
    '<div style="font-family:Arial,sans-serif;max-width:560px">' +
    '<div style="background:#280F24;color:#CDA454;padding:18px 24px;font-size:18px;letter-spacing:2px">VAISHNO VYOM — NEW ENQUIRY</div>' +
    '<table style="width:100%;border-collapse:collapse;border:1px solid #eadfcb">' +
    rows
      .map(function (row) {
        return (
          '<tr><td style="padding:10px 24px;color:#8A6A24;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;border-bottom:1px solid #f3eadb">' +
          row[0] +
          '</td><td style="padding:10px 24px;color:#351500;border-bottom:1px solid #f3eadb">' +
          escapeHtml(row[1]) +
          '</td></tr>'
        );
      })
      .join('') +
    '</table></div>';

  var options = {
    to: NOTIFY_EMAILS,
    subject: 'New enquiry: ' + data.name + (data.configuration ? ' (' + data.configuration + ')' : ''),
    htmlBody: html,
    name: 'Vaishno Vyom Website',
  };
  if (data.email) options.replyTo = data.email;
  MailApp.sendEmail(options);
}

// Stops a value being run as a spreadsheet formula.
function safe(value) {
  var text = value == null ? '' : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
