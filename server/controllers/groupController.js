module.exports.groupController = async (req, res, next) => {
    try {
        const { groupname} = req.body;
        console.log("groupname", groupname);
        return res.status(201).json({message:"successfully created a new group"})
    } catch (error) {
        console.log("error creating a new group:", error);
        return res.status(203).json({message:"error in created a new group"})
    }
}