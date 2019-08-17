describe('/api/demo', () => {
  describe('GET /video/:id', () => {
    it('should return the video', () => {
      cy.request('http://localhost:4100/demo/videos/Bv_5Zv5c-Ts').then((response) => {
        const video = response.body
        expect(video.id).to.equal('Bv_5Zv5c-Ts')
        expect(video.publishedAt).to.have.string('2015-04-03')
        expect(video.title).to.have.string('JavaScript')
        expect(video.description).to.have.string('JavaScript')
        expect(video.tags).to.not.be.empty
        expect(video.duration).to.equal('PT3H32M50S')
        expect(video.thumbnail).to.not.be.empty
        expect(video.viewCount).to.be.above(1000000)
        expect(video.likeCount).to.be.above(10000)
        expect(video.dislikeCount).to.be.above(100)
      })
    })
  })
})
