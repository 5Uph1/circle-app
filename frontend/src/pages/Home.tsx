import { ListThread } from "@/components/home/ListThread";
import { Replies } from "@/components/home/Replies";
import { useReplyManager } from "@/hooks/useReply";
import { useThreadManager } from "@/hooks/useThread";
import { House, Search, SquareUser, UserStar } from "lucide-react";
import { Route, Routes } from "react-router-dom";

export function Home() {
    const { content ,threads, fullname, username, image, fileInputRef, setContent, setImage, handleLike, handleLogout, onSubmit } = useThreadManager();

    return (
        <div className="min-h-screen bg-[#1d1d1d] text-white flex justify-center">
            <div className="flex w-full max-w-[1200px]">
            
            {/* --- SIDEBAR KIRI --- */}
            <aside className="w-[20%] p-6 sticky top-0 h-screen flex flex-col gap-6 border-r border-gray-800">
                <h1 className="text-[#04a51e] text-4xl font-bold mb-4">waduh</h1>
                <nav className="flex flex-col gap-4 text-lg">
                <a href="#" className="flex items-center gap-3 font-semibold"><House /> Home</a>
                <a href="#" className="flex items-center gap-3"><Search /> Search</a>
                <a href="#" className="flex items-center gap-3"><UserStar /> Follows</a>
                <a href="#" className="flex items-center gap-3"><SquareUser /> Profile</a>
                </nav>
                <button className="bg-[#04a51e] py-2 rounded-full font-bold mt-4">Create Post</button>
                <button className="mt-auto flex items-center gap-3 text-gray-400 cursor-pointer" onClick={handleLogout}> Logout</button>
            </aside>

            {/* --- FEED TENGAH --- */} 
            <Routes>
                <Route path="/" element={
                    <ListThread onSubmit={onSubmit} content={content} setContent={setContent} image={image} setImage={setImage} fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>} threads={threads.map(t => ({ ...t, onLike: handleLike }))} handleLike={(id) => handleLike(typeof id === 'string' ? parseInt(id) : id)} />
                }/>
                <Route path="/replies/:id" element={
                    <Replies />
                }/>
            </Routes>

            {/* --- WIDGET KANAN --- */}
            <aside className="w-[30%] p-4 flex flex-col gap-4 sticky top-0 h-screen overflow-y-auto">
                {/* Profile Card */}
                <div className="bg-[#262626] rounded-xl p-4">
                <h2 className="font-bold mb-3">My Profile</h2>
                <div className="relative mb-12">
                    <div className="h-16 bg-gradient-to-r from-green-200 to-blue-300 rounded-lg"></div>
                    {/* <img src="avatar.jpg" className="w-16 h-16 rounded-full border-4 border-[#262626] absolute -bottom-8 left-4" /> */}
                    <div className="w-16 h-16 rounded-full border-4 border-[#262626] absolute -bottom-8 left-4 bg-yellow-500"></div>
                    <button className="absolute -bottom-10 right-0 border border-white text-xs px-3 py-1 rounded-full">Edit Profile</button>
                </div>
                <div>
                    <h3 className="font-bold text-lg"> {fullname} </h3>
                    <p className="text-gray-500 text-sm">@{username}</p>
                    <p className="text-sm mt-2">picked over by the worms, and weird fishes</p>
                    <div className="flex gap-4 mt-2 text-sm">
                    <span><b className="text-white">291</b> <span className="text-gray-500">Following</span></span>
                    <span><b className="text-white">23</b> <span className="text-gray-500">Followers</span></span>
                    </div>
                </div>
                </div>

                {/* Suggested Follow */}
                <div className="bg-[#262626] rounded-xl p-4">
                <h2 className="font-bold mb-4">Suggested for you</h2>
                {/* Item suggested */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                    <div>
                        <p className="text-sm font-bold leading-none">Mamat Jawir</p>
                        <p className="text-xs text-gray-500">@em.jawirr</p>
                    </div>
                    </div>
                    <button className="border border-gray-500 px-3 py-1 rounded-full text-xs text-gray-300">Following</button>
                </div>
                {/* ...ulangi item lain */}
                </div>
            </aside>

            </div>
        </div>
    );
}
