let totalContacts = 0;
let uniqueIdGenerator = 0;
function formReset() {
    (document.getElementById("contact-form") as HTMLFormElement).reset();
    $('#contact-form').addClass('d-none');
    $('#contact-form').removeClass('d-block');
}
function displayBlock(id: string) {
    console.log(id);
    $(id).removeClass('d-none');
    $(id).addClass('d-block');
}
function displayNone(id: string) {
    console.log(id);
    $(id).removeClass('d-block');
    $(id).addClass('d-none');
}
$('.add-contact').on('click', () => {
    $('.contact-form input[type=submit]').val("Add");
    formReset();
    displayBlock('.contact-form');
    displayNone('.show-contact-details');
});
class contact {
    name: string;
    email: string;
    mobile: number;
    landline: number;
    website: string;
    address: string;
    constructor(name, email, mobile, landline, website, address) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.landline = landline;
        this.website = website;
        this.address = address;
    }
}
function addContact(contactId) {
    if (contactId) {
        $('#' + contactId).remove();
        totalContacts--;
    }
    let addContactObject: contact = new contact(
        $("#fullName").val(),
        $("#email").val(),
        $('#mobile').val(),
        $("#landline").val(),
        $("#website").val(),
        $("#address").val()
    );
    let uniqueId = "contactId" + uniqueIdGenerator++;
    let newContact = "<div class='new-contact' onclick='showContactDetails(id)' id='" + uniqueId + "'>";
    newContact += "<h1 class='contact-name'>" + addContactObject.name + "</h1>"
    newContact += "<p class='contact-email'>" + addContactObject.email + "</p>"
    newContact += "<p class='contact-mobile'>" + addContactObject.mobile + "</p>"
    newContact += "<span class='d-none'>"
    newContact += "<p class='contact-landline'>" + addContactObject.landline + "</p>"
    newContact += "<p class='contact-website'>" + addContactObject.website + "</p>"
    newContact += "<p class='contact-address'>" + addContactObject.address + "</p>"
    newContact += "</span>"
    newContact += "</div>"
    $("#contacts").append(newContact);
    totalContacts++;
    displayNone('#contact-form');
    formReset();
    (contactId) ? alert("contact of " + addContactObject.name + " updated successfully") : alert("contact of " + addContactObject.name + " added successfully");
    if (totalContacts) {

        displayNone('.no-contacts-msg');
        homePage();
    }
}
function showContactDetails(contactId: string) {
    displayNone('.contact-form');
    $(".show-contact-details").html("");
    displayBlock('.show-contact-details');
    let contactDetails = " <div class='d-flex justify-content-between '>"
    contactDetails += "<h1>" + $('#' + contactId + ' .contact-name').text() + "</h1>"
    contactDetails += `<div class='mt-2'><a href='#' id="edit-contact-button" class='edit-contact ml-5' onclick='editContact("${contactId}",id )'> Edit</a>`
    contactDetails += `<a href='#' class='delete-contact mr-3' onclick='deleteContact("${contactId}")'> Delete</a></div>`
    contactDetails += "</div>"
    contactDetails += "<p> Email: " + $('#' + contactId + ' .contact-email').text() + "</p>"
    contactDetails += "<p> Mobile: " + $('#' + contactId + ' .contact-mobile').text() + "<br>"
    contactDetails += "Landline: " + $('#' + contactId + ' .contact-landline').text() + "</p>"
    contactDetails += "<p> Website: " + $('#' + contactId + ' .contact-website').text() + "</p>"
    contactDetails += "<div class='d-flex'>Address: <pre class='ml-3'>" + $('#' + contactId + ' .contact-address').text() + "</pre></div>"
    $(".show-contact-details").append(contactDetails);
}
function deleteContact(contactId: string) {
    if (confirm("are you sure to delete")) {
        $('#' + contactId).remove();
        totalContacts--;
        $(".show-contact-details").html("");
        (!totalContacts) ? displayBlock('.no-contacts-msg') : "";//checkpoint
        homePage();
    }
}
function editContact(contactId: string) {
    $('.contact-form input[type=submit]').val("Update");
    displayNone('.show-contact-details');
    displayBlock('.contact-form');
    let updateContactObject: contact = new contact(
        $('#' + contactId + ' .contact-name').text(),
        $('#' + contactId + ' .contact-email').text(),
        $('#' + contactId + ' .contact-mobile').text(),
        $('#' + contactId + ' .contact-landline').text(),
        $('#' + contactId + ' .contact-website').text(),
        $('#' + contactId + ' .contact-address').text()
    );
    $('#contact-form input[id="fullName"]').val(updateContactObject.name);
    $('#contact-form input[id="email"]').val(updateContactObject.email);
    $('#contact-form input[id="mobile"]').val(updateContactObject.mobile);
    $('#contact-form input[id="landline"]').val(updateContactObject.landline);
    $('#contact-form input[id="website"]').val(updateContactObject.website);
    $('#contact-form input[id="address"]').val(updateContactObject.address);
    $('.contact-form').attr('onsubmit', `addContact('${contactId}')`);
}
function homePage() {
    $('.contact-form').attr('onsubmit', 'addContact()');
    formReset();
    for (let i = 0; i <= uniqueIdGenerator; i++) {
        let firstContactAvailable = "contactId" + i;
        if ($('#' + firstContactAvailable).text()) {
            showContactDetails(firstContactAvailable);
            break;
        }
    }
}