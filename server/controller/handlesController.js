const Profile = require('../../models/profile');

exports.getHandles = (req, res) => {
    Profile.findOne({ userid: res.locals.myuserid })
        .then(userprofile => {
            res.send(userprofile.handles)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
        })
}

exports.updateHandles = (req, res) => {

    const {
        email,
        facebook,
        twitter,
        instagram,
        youtube,
        soundcloud,
        bandcamp,
        linkedin,
        clubhouse,
        substack,
        whatsapp,
        telegram,
        signal,
        twitch,
        patreon,
        cameo,
        pinterest,
        tiktok,
        spotify,
        amazon,
        apple_music,
        snapchat,
        apple_podcast,
        apple_appstore,
        apple_playstore,
        payment,
        etsy,
        poshmark,
        github
    } = req.body;

    let inputHandles = {
        'handles.email': email,
        'handles.facebook': facebook,
        'handles.twitter': twitter,
        'handles.instagram': instagram,
        'handles.youtube': youtube,
        'handles.soundcloud': soundcloud,
        'handles.bandcamp': bandcamp,
        'handles.linkedin': linkedin,
        'handles.clubhouse': clubhouse,
        'handles.substack': substack,
        'handles.whatsapp': whatsapp,
        'handles.telegram': telegram,
        'handles.signal': signal,
        'handles.twitch': twitch,
        'handles.patreon': patreon,
        'handles.cameo': cameo,
        'handles.pinterest': pinterest,
        'handles.tiktok': tiktok,
        'handles.spotify': spotify,
        'handles.amazon': amazon,
        'handles.apple_music': apple_music ,
        'handles.snapchat': snapchat ,
        'handles.apple_podcast': apple_podcast ,
        'handles.apple_appstore': apple_appstore ,
        'handles.apple_playstore': apple_playstore ,
        'handles.payment': payment ,
        'handles.etsy': etsy ,
        'handles.poshmark': poshmark,
        'handles.github': github
    }
    let handlesToUnset = {};
    for(handl in inputHandles)
    {
        if(inputHandles[handl]=='')
        {
            handlesToUnset[handl] = 1;
            inputHandles[handl] = undefined;
        }
    }

    Profile.updateOne({ userid: res.locals.myuserid }, { $set: inputHandles , $unset:handlesToUnset})
        .then(userprofile => {
            res.send({ message: "Handles updated successfully!" })
        })
        .catch(err => {
            res.status(500).send({ message: "Error update handles" })
        })
}