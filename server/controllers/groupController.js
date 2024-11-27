const Groups = require("../models/groupModel");

module.exports.groupController = async (req, res, next) => {
    try {
        const { groupname, admin} = req.body;
        console.log("groupname", groupname);

        try {
            const newGroup = new Groups({
                name: groupname,
                admin,
                users: [admin],
            })
            console.log("newGroup:", newGroup);
            await newGroup.save();
            return res.status(201).json({message:"successfully created a new group"})
        } catch (error) {
            console.log("error in creating group:", error);
            return res.status(403).json({message:"new group created failed"})
        }
    } catch (error) {
        console.log("error creating a new group:", error);
        return res.status(203).json({message:"error in created a new group"})
    }
}