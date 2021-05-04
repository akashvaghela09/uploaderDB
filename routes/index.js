const express = require("express")
// const subscriber = require("../models/subscriber")

const router = express.Router()

const Subscriber = require("../models/subscriber")

// Getting All Data
router.get("/", async (req, res) => {
    try {
        const subscriber = await Subscriber.find()
        res.status(200).json({data: subscriber})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


// Getting Single Data
router.get("/:id", getSubscriber, (req, res) => {
    res.status(200).json(res.subscriber)
})


// Posting Data
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        city: req.body.city
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json({data: newSubscriber})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


// Patch or Update Data
router.patch("/:id", getSubscriber, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.city != null){
        res.subscriber.city = req.body.city
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


// Delete Data
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.status(200).json({ message: "Deleted Subscriber"})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: "Cannot found"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router