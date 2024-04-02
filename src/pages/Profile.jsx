import Layout from "./Layout";

function Profile() {
  return (
    <Layout>
      <div className="w-full flex flex-col flex-1 p-5">
        <div className="w-full flex border-b-2 border-white py-2">
          <div className="w-fit mr-4">
            <div
              className="w-[80px] h-[80px] rounded-full bg-cover"
              style={{
                backgroundImage: "url(https://picsum.photos/200/300?random=1)",
              }}
            ></div>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-white">Nurdiansyah</p>
            <p className="text-xl font-thin text-white">
              nurdiansyah@students.undip.ac.id
            </p>
            <p className="text-xl font-medium text-white">Fisika</p>
          </div>
        </div>
        <div className="w-full py-2">
          <p className="text-white text-base text-justify">
            Fugiat nostrud occaecat quis reprehenderit eu qui nostrud sunt est
            dolor sit. Dolor pariatur ipsum incididunt tempor dolore minim quis
            adipisicing deserunt nostrud. Eu labore in labore ex dolor. In esse
            tempor qui ad velit do est do laboris cillum. Laborum eu ut aliquip
            ad amet sunt eiusmod do.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
