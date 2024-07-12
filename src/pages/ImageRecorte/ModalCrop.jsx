import ImageCut from "./ImageCut";
import "../ImageRecorte/ModalCrop.css"
function ModalCrop({ ImagelogroUpdate, closeModal }) {
    return (
        <div
          className="relative z-10"
          aria-labelledby="crop-image-dialog"
          role="dialog"
          aria-modal="true"
        >
          <div className="primer-clase"></div>
          <div className="segunda-clase fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="tercera-clase flex min-h-full justify-center px-2 py-12 text-center ">
              <div className="cuarta-clase relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all">
                <div className="quinta-clase px-5 py-4">
                  <button
                    type="button"
                    className="sexta-clase"
                    onClick={closeModal}
                  >
                    <span className="close-modal">Close menu</span>
                    x
                  </button>
                  <ImageCut
                    ImagelogroUpdate={ImagelogroUpdate}
                    closeModal={closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default ModalCrop