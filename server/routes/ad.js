const express = require("express")
const Store = require("../model/store")
const Stats = require("../model/stats")

const router = express.Router()

router.post("/create", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.id)
    store.advertisement.push(req.body.ad)

    const savedStore = await store.save()
    const numAds = savedStore.advertisement.length

    /* creating stats entry for the ad */
    const adStats = new Stats.Stats({
      adId: savedStore.advertisement[numAds - 1]._id,
    })
    await adStats.save()

    res.status(201).send({Msg: "Created new Advertisement!"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/delete", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.storeId)

    store.advertisement = store.advertisement.filter((ad) => {
      return ad._id != req.body.adId
    })

    await store.save()
    res.status(200).send({Msg: "Advertisement deleted!"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/view", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.query.id)
    const adList = store.advertisement

    if (adList.length == 0) {
      throw "Currently no advertisements are created."
    }
    res.status(200).send(adList)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/update", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.storeId)
    const adList = store.advertisement

    for (const ad of adList) {
      if (ad._id.toString() === req.body.adId) {
        req.body.likeValue
          ? ad.likedBy.push(req.body.userId)
          : (ad.likedBy = ad.likedBy.filter(
              (userId) => userId !== req.body.userId
            ))
      }
    }
    await store.save()
    res.status(200).send({Msg: "Updated successfully!"})
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = {adRouter: router}
