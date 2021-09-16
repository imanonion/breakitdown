import { Firebase } from "./src/services/Firebase";

let batch = Firebase.firestore().batch()

const seedArray = [
    { name: "Indian Step", genre: "Breaking", type: "Lesson", duration: "0:22", storageThumbnailRef: "/thumbnails/Breaking_Indian_Step.png", storageVideoRef: "/videos/Breaking_Indian_Step.mp4", description: "The Indian Step is one form of Top Rock, which is when a B-Boy or B-Girl is dancing while still standing and it's how breakers start their throw down, before going to the floor.", steps: [{title: "Start in the Centre", explanation: "Stay centered, have your legs spread out shoulder length apart. Cross your arms together and swing your right leg across to your left."}, {title: "Reset", explanation: "Bring your right leg back to the starting position. "}, {title: "Repeat", explanation: "Cross your arms together and swing your left leg across to your right."}, {title: "End stylishly", explanation: "Strike your best (cool) pose to end the sequence"}] },
    { name: "Breaking Step Two", genre: "Breaking", type: "Lesson", duration: "0:22", storageThumbnailRef: "/thumbnails/Breaking_Step_Two.png", storageVideoRef: "/videos/Breaking_Step_Two.mp4", description: "The Breaking Step Two is one form of Top Rock, which is when a B-Boy or B-Girl is dancing while still standing and it's how breakers start their throw down, before going to the floor.", steps: [{title: "Step 1", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}, {title: "Step 2", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}, {title: "Step 3", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}] },
    { name: "Hip Hop Step One", genre: "Hip Hop", type: "Lesson", duration: "0:22", storageThumbnailRef: "/thumbnails/HipHop_Step_One.png", storageVideoRef: "/videos/Hiphop_Step_One.mp4", description: "The Hip Hop Step One is one form of Top Rock, which is when a B-Boy or B-Girl is dancing while still standing and it's how breakers start their throw down, before going to the floor.", steps: [{title: "Step 1", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}, {title: "Step 2", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}, {title: "Step 3", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}] },
    { name: "Hip Hop Step Two", genre: "Hip Hop", type: "Lesson", duration: "0:22", storageThumbnailRef: "/thumbnails/HipHop_Step_Two.png", storageVideoRef: "/videos/HipHop_Step_Two.mp4", description: "The Hip Hop Step Two is one form of Top Rock, which is when a B-Boy or B-Girl is dancing while still standing and it's how breakers start their throw down, before going to the floor.", steps: [{title: "Step 1", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}, {title: "Step 2", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}, {title: "Step 3", explanation: "this is how you do it this is how you do it this is how you do it this is how you do it this is how you do it"}] },
]

seedArray.forEach((doc) => {
    var docRef = Firebase.firestore().collection("lessons").doc(); //automatically generate unique id
    batch.set(docRef, doc);
});

batch.commit()
    .then (() => {
        console.log(`lessons seeded successfully`)
    })
    .catch ((err) => {
        console.log(`seed error: ${err}`)
    })