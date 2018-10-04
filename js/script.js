/* start the external action and say hello */
console.log("App is alive");


/** #7 Create global variable */
var currentChannel;

/** New: Definition of global variable reflecting the type of button to create messages (new create button or former arrow button)*/
var operator = 'old';

/** #7 We simply initialize it with the channel selected by default - sevencontinents */
currentChannel = sevencontinents;

/** Store my current (sender) location
 */
var currentLocation = {
    latitude: 48.249586,
    longitude: 11.634431,
    what3words: "shelf.jetted.purple"
};

/**
 * Switch channels name in the right app bar
 * @param channelObject
 */
function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    // #7  Write the new channel to the right app bar using object property
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#7  change the channel location using object property
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/'
        + channelObject.createdBy
        + '" target="_blank"><strong>'
        + channelObject.createdBy
        + '</strong></a>';

    /* #7 remove either class */
    $('#chat h1 i').removeClass('far fas');

    /* #7 set class according to object property */
    $('#chat h1 i').addClass(channelObject.starred ? 'fas' : 'far');


    /* highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');

    /* #7 store selected channel in global variable */
    currentChannel = channelObject;
}

/* liking a channel on #click */
function star() {
    // Toggling star
    // #7 replace image with icon
    $('#chat h1 i').toggleClass('fas');
    $('#chat h1 i').toggleClass('far');

    // #7 toggle star also in data model
    currentChannel.starred = !currentChannel.starred;

    // #7 toggle star also in list
    $('#channels li:contains(' + currentChannel.name + ') .fa').removeClass('fas far');
    $('#channels li:contains(' + currentChannel.name + ') .fa').addClass(currentChannel.starred ? 'fas' : 'far');
}

/**
 * Function to select the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    $('#tab-bar button').removeClass('selected');
    console.log('Changing to tab', tabId);
    $(tabId).addClass('selected');
}

/* Below code can be ignored, it should reflect the new simileys 
   function createSmileys() {

    //return '<p> Hello </p>';
  
    var smiley= "<div class='md-whiteframe-24dp' id='emojis'>" + smileys[0]+ "</div>";
    console.log(smiley);
    return smiley;
   } */

/**
 * toggle (show/hide) the emojis menu
 */
function toggleEmojis() {
    /*console.log('In toggle Funktion');
    for (i=0;i<emojis.length;i++) {
        $('#emojis').append(emojis[1]);
    }*/

     $('#emojis').toggle(); // #toggle
    //require('emojis-list');
    //var smileys = require('emojis-list')
    /*console.log('Emojis: ', smileys[1629]);
    console.log('Emojis: ', emojis[1630]);
    console.log('Emojis: ', emojis[1631]);
    console.log('Emojis: ', emojis[1632]);
    console.log('Emojis: ', emojis[1633]);
    console.log('Emojis: ', emojis[1634]);
    console.log('Emojis: ', emojis[1635]);
    console.log('Emojis: ', emojis[1636]);
    console.log('Emojis: ', emojis[1637]);
    console.log('Emojis: ', emojis[1638]);
    console.log('Emojis: ', emojis[1639]);
    console.log('Emojis: ', emojis[1640]);
    console.log('Emojis: ', emojis[1641]);
    console.log('Emojis: ', emojis[1642]);
    console.log('Emojis: ', emojis[1643]);
    console.log('Emojis: ', emojis[1644]);
    console.log('Emojis: ', emojis[1645]);
    console.log('Emojis: ', emojis[1646]);
    console.log('Emojis: ', emojis[1647]);
    console.log('Emojis: ', emojis[1648]);
    console.log('Emojis: ', emojis[1649]);
    console.log('Emojis: ', emojis[1650]);
    console.log('Emojis: ', emojis[1651]);
    console.log('Emojis: ', emojis[1652]);
    console.log('Emojis: ', emojis[1653]);
    console.log('Emojis: ', emojis[1654]);
    console.log('Emojis: ', emojis[1655]);
    console.log('Emojis: ', emojis[1656]);
    console.log('Emojis: ', emojis[1647]);
    console.log('Emojis: ', emojis[1648]);*/
    //$('#emojis').html('<div class="md-whiteframe-24dp" id="emojis">&#x1F601; &#x1F602; &#x1F603; &#x1F604; &#x1F605; &#x1F606; &#x1F607;</div>');
}


/**
 * #8 This #constructor function creates a new chat #message.
 * @param text `String` a message text
 * @constructor
 */
function Message(text) {
    // copy my location
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    // set dates
    this.createdOn = new Date() //now
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000); // mins * secs * msecs
    // set text
    this.text = text;
    // own message
    this.own = true;
}


/** New:
 * #8 This #constructor function creates a new channel object.
 * @param channel `String` the new channel name
 * @param messageInstance `New messageObject
 * @constructor
 */
function Channel(channel, messageInstance) {
    // copy my location
    this.name = channel;
    this.createdOn =  new Date();
    this.createdBy= currentLocation.what3words;
    this.starred = true;
    this.expiresIn= 15;
    this.messageCount = 2424;
    this.messages= [];
}


// New: Message and Channel name will be validated if their input is correct
function validateMessage(operator){

       //Read content of message input field
       var message= $('#message').val();
       //console.log('message inhalt in validate Funktion', message);
       //console.log('Operator', operator);
     
       //if not old arrow button has been clicked respectively the new create button has been submitted 
       //then not only the message input field, but also the channel input field needs to be validated
       if (operator != 'old') {
          var channelName= $('#channelName').val();
          var firstLetter= channelName.charAt(0);
          var positionBlank= channelName.indexOf(' ');
          //console.log('channelName(1): ', channelName.charAt(0));
          //console.log('channelName(1): ', channelName.slice(0,1));
          //console.log('channelName(1): ', channelName.substr(0,1));
          //console.log('First Letter: ', firstLetter);
          //console.log('Position Blank: ', positionBlank);
       // If a message as well as a channel name have been entered in input fields and channel name starts with # sign, then message and channel are valid
       if (message.length >0 && channelName.length >0 && firstLetter == "#"  && positionBlank <0 ) {
          return true;
       }
       else{
          return false;
       }
    }

    //if old arrow button respectively not new create button has been submitted then only the meessage needs to be valdated, not the channel name
    //Message needs to be not empty
    else if (operator == 'old') {
        //console.log('In old Prüfung');
        if (message.length >0) {
            return true;
        }
        else{
            return false;
        }
    } else {

    }
}


function sendMessage() {
    // #8 Create a new message to send and log it.
    //var message = new Message("Hello chatter");

    //console.log('in sendMessage Funktion');

    //New: the entered message will be validated by calling the validateMessage function
    var messageValid = validateMessage(operator);
    //console.log('message valid ?', messageValid);
    
     //New: Call constructor to create a new message object if validation has been positive
    if (messageValid==true ) {   

    // #8 let's now use the real message #input
    //Read message text from message input field and store it in message variable
    var message = new Message($('#message').val());
    //console.log('message Inhalt', message);

    //New: Call constructor to create a new channel object
    //if (messageValid==true ) {
        
        //New: If new create button has been submitted also a new channel object needs to be created 
        //New: The new channel object will be added to channels array and the variable current channel will be set on new created channel object
        if (operator == 'new'){
           var newChannel = new Channel($('#channelName').val());
           currentChannel = newChannel;
           channels.push(newChannel);
           //console.log('message: ', message);
           //console.log('New channel: ', newChannel);
           //console.log('Channels: ', channels);
           //console.log('Current channel: ', currentChannel);
        };
    
  
       /* New: Add created new message object to current Channel array */
       currentChannel.messages.push(message);
 
       // #8 convenient message append with jQuery:
       $('#messages').append(createMessageElement(message));

       /* New: Increase number of messages (attribute messageCount) in current channel object because new message object has been created */
       currentChannel.messageCount = currentChannel.messageCount + 1;
       // console.log("Current Channel: ", currentChannel.messageCount);

      // #8 messages will scroll to a certain point if we apply a certain height, in this case the overall scrollHeight of the messages-div that increases with every message;
      // it would also scroll to the bottom when using a very high number (e.g. 1000000000);
       $('#messages').scrollTop($('#messages').prop('scrollHeight'));

      // #8 clear the message input
      $('#message').val('');

      // New: Switch back to app bar according to new channel
      restoreAppbar();

      //New: Refresh channel list including new created channel
      listChannels('New');

    }
    //New: If validation has been failed then alert error messsage will be show to user
    else {
      alert('Please enter a message before submitting the send button!');
    };
}

/**
 * #8 This function makes an html #element out of message objects' #properties.
 * @param messageObject a chat message object
 * @returns html element
 */
function createMessageElement(messageObject) {
    // #8 message properties
    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);

    //console.log(' In createMessageElement messageObject.createdOn: ', messageObject.createdOn.toLocaleString());

    // #8 message element
    return '<div class="message'+
        //this dynamically adds the class 'own' (#own) to the #message, based on the
        //ternary operator. We need () in order to not disrupt the return.
        (messageObject.own ? ' own' : '') +
        '">' +
        '<h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank">'+
        '<strong>' + messageObject.createdBy + '</strong></a>' +
        messageObject.createdOn.toLocaleString() +
        '<em>' + expiresIn+ ' min. left</em></h3>' +

        //Add new shadow of 2px for messages paragraph
        '<p text-shadow:2dp>' + messageObject.text + '</p>' +
        '<button class="accented" >+5 min.</button>' +
        '</div>';
}


/* New: Definition of compare function to compare (sort in descending order) channels according to creation Date of channel */ 
function compareCreationDate(channel1, channel2) {
    if (channel1.createdOn < channel2.createdOn) {
      return 1;
    }
    if (channel1.createdOn > channel2.createdOn) {
      return -1;
    }
    // channel 1 must be equal to channel 2
    return 0;
  }

  /* New: Definition of compare function to compare (sort in descending order) channels according to number of messages 
  in the channel respectively the messageCount attribute of the channel object */ 
  function compareMessageCount(channel1, channel2) {
    /*console.log('In Sortierung Channel 1: ', channel1.messageCount);
    console.log('In Sortierung Channel 2: ', channel2.messageCount);
    console.log('In Sortierung Returnwert: ', channel1.messageCount-channel2.messageCount);*/
    return channel2.messageCount-channel1.messageCount;
  }

  /* New: Definition of compare function to compare stars of the channel in the sort order "starred" before "unstarred" */
  function compareStars(channel1, channel2) {
    if (channel1.starred < channel2.starred) {
      return 1;
    }
    if (channel1.starred > channel2.starred) {
      return -1;
    }
    // channel 1 must be equal to channel 2
    return 0;
  }

  function abortMessage(){

    // New: Restore right app bar with current channel data after clicking abort button (and later on sitching current channel)
    var star='';
    if (currentChannel.starred==true){
        var star='<i class="fas fa-star" onclick="star()"></i>';
    } else {
    var star='<i class="far fa-star" onclick="star()"></i>';
    }

    //$("h1:last").replaceWith('<h1 id = "appbar" class="md-whiteframe-4dp"> <span id="channel-name">#SevenContinents</span> <small id="channel-location">by <strong>cheeses.yard.applies</strong></small> <i class="fas fa-star" onclick="star()"></i></h1>');
    $("h1:last").replaceWith('<h1 id = "appbar" class="md-whiteframe-4dp"> <span id="channel-name">#SevenContinents</span> <small id="channel-location">by <strong>' + currentChannel.createdBy + '</strong></small>' + star + '</i></h1>');
    $("button:last").replaceWith('<button class="accented" id="sendButton" onclick="sendMessage()"><i class="fas fa-arrow-right"></i></button>');
    operator ='old';
}

  // New: Update right app bar and message send button with current channel data and original arrow send button after having created a new channel
  function restoreAppbar(){

    // New: Update right app bar with current channel data after having created a new channel
    var star='';
    if (currentChannel.starred==true){
        var star='<i class="fas fa-star" onclick="star()"></i>';
    } else {
    var star='<i class="far fa-star" onclick="star()"></i>';
    }
    $("h1:last").replaceWith('<h1 id = "appbar" class="md-whiteframe-4dp"> <span id="channel-name">' + currentChannel.name + ' </span> <small id="channel-location">by <strong>' + currentChannel.createdBy + '</strong></small>' + star + '</i></h1>');
    $("button:last").replaceWith('<button class="accented" id="sendButton" onclick="sendMessage()"><i class="fas fa-arrow-right"></i></button>');  
    operator = 'old';
}
  
function createChannels() {
  //console.log('In createChannels');
  
  //New: clear message input field
  $('#messages').empty();
  //console.log('h1:last', $("h1:last") );
  //console.log("div:nth-child(1): ", $("div:nth-child(1)"));
  //$("h1:nth-child(1)").replaceWith('<h1> Hello World </h1>');

  // New: Replace right top app bar with new channel text input field and abort button when clicking on new FAB button
  $("h1:last").replaceWith('<h1> <input type="text" placeholder="Enter a #ChannelName" size=80 id="channelName"> <button class="primary" id="abortButton" onclick="abortMessage()">x abort</button></h1>');
  //$("div:last").replaceWith('<div class="md-whiteframe-24dp" id="emojis" >&#x1F601; &#x1F602; &#x1F603; &#x1F604; &#x1F605; &#x1F606; &#x1F607;</div> <input type="text" placeholder="Message..." maxlength="140" id="message" size=80> <button class="accented" id="sendButton" onclick="sendMessage()">CREATE</button></div>');
 
  // New: Replace old arrow send button at the bottom with new type of create button after clicking on new FAB button
  $("button:last").replaceWith('<button class="accented" id="sendButton" onclick="sendMessage()">CREATE</button>');
  //console.log('AM Ende von create Channels mit CREATE button erzeugung');

  //New: Set global variable operator to new, which will be used in validate function, because validation depends on operation mode
  // New: If operator = 'new' then also channel input field needs to be validated and not only message input field
  operator = 'new';
}


function listChannels(sortCriteria) {
    // #8 channel onload
    //$('#channels ul').append("<li>New Channel</li>")

    // #8 five new channels

    /* New: Remove old code for appending seperate single objects to channel list
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));*/

    // New: Add appending channel objects to channel list by looping through array of channel objects and
    // sort channels according to creation date of channel in descending order
    /*for (i=0;i<channels.length-1;i++) {
    var channel1 = channels[i].messageCount;
    var channel2 = channels[i+1].messageCount;*/

    //channels.sort(compareMessageCount);
    //channels.sort(compareStars);

    
    //New: Sorting of channels according to clicked button
    console.log('IN Funktion ListChannel sortCriteria: ', sortCriteria)
    if (sortCriteria=='New'){
       console.log('in New: ', sortCriteria);
       channels.sort(compareCreationDate);
       selectTab('#tab-new');
    } else if (sortCriteria=='Trending'){
        console.log('in Trending: ', sortCriteria);
       channels.sort(compareMessageCount);
       selectTab('#tab-trending');
    } else if (sortCriteria=='Favorites'){
       console.log('in Favorites: ', sortCriteria);
       channels.sort(compareStars);
       selectTab('#tab-favorites');
    } else {
    console.log('in else-Zweig: ', sortCriteria);
      channels.sort(compareCreationDate);
    };
    //}

    //Create channel list
    var i;
    $('#channels ul').empty();
    for (i=0;i<channels.length;i++) {
        $('#channels ul').append(createChannelElement(channels[i]));
    }
}

/**
 * #8 This function makes a new jQuery #channel <li> element out of a given object
 * @param channelObject a channel object
 * @returns {HTMLElement}
 */
function createChannelElement(channelObject) {
    /* this HTML is build in jQuery below:
     <li>
     {{ name }}
        <span class="channel-meta">
            <i class="far fa-star"></i>
            <i class="fas fa-chevron-right"></i>
        </span>
     </li>
     */

    // create a channel
    var channel = $('<li>').text(channelObject.name);

    // create and append channel meta
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);

    // The star including star functionality.
    // Since we don't want to append child elements to this element, we don't need to 'wrap' it into a variable as the elements above.
    $('<i>').addClass('fa-star').addClass(channelObject.starred ? 'fas' : 'far').appendTo(meta);

    // #8 channel boxes for some additional meta data
    $('<span>').text(channelObject.expiresIn + ' min').appendTo(meta);
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);

    // The chevron
    $('<i>').addClass('fas').addClass('fa-chevron-right').appendTo(meta);

    // return the complete channel
    return channel;
}


