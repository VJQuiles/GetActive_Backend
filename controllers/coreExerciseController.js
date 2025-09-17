const CoreExercise = require('../models/CoreExercise')

async function seedDB(req, res) {
    try {
        await CoreExercise.deleteMany({})
        await CoreExercise.create(
            {
                name: 'Bench Press',
                instructions: 'Lay down on the bench. Place feet in a loaded position(calves are tense). Maintain a 45 degree angle between the elbow and the torso. Retract Scapula. Exhale as you press.',
                liftType: 'Compound',
                equipmentType: 'Barbell'
            },
            {
                name: 'Lateral Shoulder Raise',
                instructions: 'Grab lightweight dumbbells(5 - 20 lbs). Lift each dumbbell in an alternating fashion. As you lift, focus on lifting from your elbow to better engage the shoulder. Retract scapula for better shoulder engagement.',
                liftType: 'Accessory',
                equipmentType: 'Dumbbell'
            },
            {
                name: 'Tripcep Pull Down',
                instructions: 'Use a cable machine for this exercise. With a single rope grip(or just the cable with no attachment), grip in a neutral position(hand in a vertical position), and pull down in a controlled fashion. While pulling, focus on keeping the arm locked in position, extending and contracting purely from the elbow. Sometimes one tends to allow the elbow to move forward in the concentric portion of the lift, engageing the shoulder, when the goal is to only engage the triceps.',
                liftType: 'Accessory',
                equipmentType: 'Machine'
            },
            {
                name: 'Squat',
                instructions: 'King of all exercises. Stand under the bar, resting it on your traps. Ensure youre scapula is retracted to allow more real esatate for the bar to sit on. There is a little bit of feel that goes in with the squat. You generally want to start around shoulder width in terms of foot positioning, and then adjust from there. You can either move your feet inward(I personally squat more hip width), or outward. The goal is to ensure that your heels do not lift as you descend, and to ensure as you sit in the sqaut, you can maintain a nuetral spine. In regards to a neutral spine, poke your butt out and your chest out, and that will create a neutral spine for you. As you sit in the squat, make sure you do not hinge at the hip, that can cause lower back issues.',
                liftType: 'Compound',
                equipmentType: 'Barbell'
            },
            {
                name: 'Leg Extension',
                instructions: 'Genrally gyms have machines for leg extensions. Sit the reisitance portion of the machine on the lower part of the shin, a little above the ankle. Single leg is better for building symmetrical strength, allowing compound movements to take care of overall strength. Lift from you ankle, feeling the tension on your quad. Hold for 2 seconds before the concentric portion.',
                liftType: 'Accessory',
                equipmentType: 'Machine'
            },
            {
                name: 'Leg Curl',
                instructions: 'As with the leg extension, there are generally leg curl machines. Here you want to ensure the resistance portion of the leg curl machine sits at the base of the calf. Bring your ankle to your butt, feeling the tension in your hamstring. This is also best done single leg.',
                liftType: 'Accessory',
                equipmentType: 'Machine'
            },
            {
                name: 'Bent Over Row',
                instructions: 'To get in position for a barbell row, grab a barbell, and lean forward so your hips are at a 90 degree angle with your legs. Pop your chest out as well to create a neutral spine. The bar should be hanging away from your body in your hands. Pull the barbell to your belly button, focusing on squeezing together you elbows behind your back. SOmething to note, depending on how far you lean forward, you distribute the weight either more to your lats or your traps/rhomboids.',
                liftType: 'Compound',
                equipmentType: 'Barbell'
            },
            {
                name: 'Lat Pulldown',
                instructions: 'There are machines for this in the gym, usually seated cable machines that pin the legs down. FOr this variation, a long bar attachment for the cable is better. You want to grab the bar outside of shoulder width, and straighten your back out, retracting your scapula. Pull the bar to your solar plexus, feeling the tesion in your lats, as well as your rhomboids and other smaller muscles in the area. To increase range of motion, lean back a it.',
                liftType: 'Compound',
                equipmentType: 'Machine'
            },
            {
                name: 'Bicep Curl',
                instructions: "Very common exercise. Here again i would reccomend light dumbbells. FOr this version, we will discuss supinated curls, or curls where you twist your wrists up and away from your body to enhance the squeeze, and maximize what the kids call your 'peaks'.",
                liftType: 'Accessory',
                equipmentType: 'Dumbbell'
            },
        )
        res.status(201).json({ message: 'DB Seeded' })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: `Error seeding DB: ${error.message}` })
    }
}

async function getAll(req, res) {
    try {
        const coreExercises = await CoreExercise.find({})
        if (!coreExercises) return res.status(404).json({ error: `Did you seed the db right?` })
        return res.json(coreExercises)
    } catch (error) {
        console.error(`Error getting exercises: ${error}`)
        return res.status(400).json({ error: "Error getting core exercises" })
    }
}

async function getOne(req, res) {
    try {
        const coreExercise = await CoreExercise.findOne({ _id: req.params.ceId })
        if (!coreExercise) return res.status(404).json({ error: `No exercise with ID: ${req.params.ceId}` })
        return res.json(coreExercise)
    } catch (error) {
        console.error(`Error getting core exercise with ID: ${req.params.exerciseId} => ${error}`)
        return res.status(500).json({ error: "Error retrieving core exercise" })
    }
}

module.exports = {
    seedDB,
    getAll,
    getOne
}